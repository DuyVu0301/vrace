import axios from "axios";
import db from "./db.js"; // Assuming you have a db connection module

const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI =
  process.env.STRAVA_REDIRECT_URI ||
  "http://localhost:3000/auth/strava/callback";

// Generate Strava authorization URL
export const getAuthUrl = (req, res) => {
  const scopes = "activity:read_all";
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    STRAVA_REDIRECT_URI
  )}&response_type=code&scope=${scopes}`;
  res.redirect(authUrl);
};

// Handle Strava OAuth callback
export const stravaCallback = async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: "No authorization code provided" });
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
      }
    );

    const { access_token, refresh_token, expires_at } = tokenResponse.data;
    const userId = req.user.id; // Assuming user is authenticated via session/JWT

    // Save tokens to database
    await db.query(
      "UPDATE users SET strava_access_token = ?, strava_refresh_token = ?, strava_expires_at = ? WHERE id = ?",
      [access_token, refresh_token, expires_at, userId]
    );

    res.json({
      message: "Strava account connected successfully",
      expiresAt: new Date(expires_at * 1000),
    });
  } catch (error) {
    console.error(
      "Strava callback error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to connect Strava account" });
  }
};

// Check and refresh token if expired
export const refreshTokenIfNeeded = async (userId) => {
  try {
    const [user] = await db.query(
      "SELECT strava_access_token, strava_refresh_token, strava_expires_at FROM users WHERE id = ?",
      [userId]
    );

    if (!user || !user.strava_access_token) {
      throw new Error("No Strava tokens found for user");
    }

    const now = Math.floor(Date.now() / 1000);

    // Check if token is expired or expiring soon (within 5 minutes)
    if (user.strava_expires_at - now > 300) {
      return user.strava_access_token; // Token is still valid
    }

    // Refresh the token
    const tokenResponse = await axios.post(
      "https://www.strava.com/oauth/token",
      {
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: user.strava_refresh_token,
        grant_type: "refresh_token",
      }
    );

    const { access_token, refresh_token, expires_at } = tokenResponse.data;

    // Update database with new tokens
    await db.query(
      "UPDATE users SET strava_access_token = ?, strava_refresh_token = ?, strava_expires_at = ? WHERE id = ?",
      [access_token, refresh_token, expires_at, userId]
    );

    return access_token;
  } catch (error) {
    console.error("Token refresh error:", error.message);
    throw error;
  }
};

// Middleware to ensure valid token before API calls
export const ensureValidToken = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const validToken = await refreshTokenIfNeeded(userId);
    req.stravaAccessToken = validToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "Strava token unavailable or expired" });
  }
};
