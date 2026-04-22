import express from "express";
import {
  getAuthUrl,
  stravaCallback,
  ensureValidToken,
} from "./stravaController.js";
import { isAuthenticated } from "./middleware/auth.js"; // Assuming you have auth middleware

const router = express.Router();

// Route to initiate Strava OAuth
router.get("/auth/strava", isAuthenticated, getAuthUrl);

// Route to handle Strava callback
router.get("/auth/strava/callback", isAuthenticated, stravaCallback);

// Example protected route that uses Strava data
router.get(
  "/strava/activities",
  isAuthenticated,
  ensureValidToken,
  async (req, res) => {
    try {
      const response = await axios.get(
        "https://www.strava.com/api/v3/athlete/activities",
        {
          headers: {
            Authorization: `Bearer ${req.stravaAccessToken}`,
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Strava activities" });
    }
  }
);

export default router;
