const express = require("express");
const router = express.Router();

// Import the sync function (adjust path as needed)
const { syncUserActivities } = require("../services/stravaSync");

const VERIFY_TOKEN = process.env.STRAVA_VERIFY_TOKEN || "your_verify_token";

/**
 * GET /webhook
 * Subscription validation endpoint required by Strava
 * Strava sends: hub.mode, hub.challenge, hub.verify_token
 */
router.get("/webhook", (req, res) => {
  const {
    "hub.mode": mode,
    "hub.challenge": challenge,
    "hub.verify_token": token,
  } = req.query;

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.json({ "hub.challenge": challenge });
  } else {
    res.status(403).json({ error: "Invalid verification token" });
  }
});

/**
 * POST /webhook
 * Event callback endpoint for activity updates
 * Responds with 200 OK immediately as required by Strava
 */
router.post("/webhook", (req, res) => {
  // Respond immediately with 200 OK to satisfy Strava's requirements
  res.status(200).json({ received: true });

  // Process the event asynchronously
  const event = req.body;

  if (event.object_type === "activity" && event.aspect_type === "create") {
    const userId = event.owner_id;

    // Trigger sync for the specific user without awaiting
    syncUserActivities(userId).catch((error) => {
      console.error(`Error syncing activities for user ${userId}:`, error);
    });
  }
});

module.exports = router;
