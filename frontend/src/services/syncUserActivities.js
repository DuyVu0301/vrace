const axios = require("axios");
const db = require("../db"); // Adjust path to your database connection

const STRAVA_API_BASE = "https://www.strava.com/api/v3";

/**
 * Synchronize running activities from Strava for a user
 * @param {string} userId - The user's ID in the database
 * @param {string} accessToken - The user's Strava access token
 * @returns {Promise<Object>} Summary of sync operation
 */
async function syncUserActivities(userId, accessToken) {
  try {
    // Fetch latest activities from Strava API
    const stravaActivities = await fetchStravaActivities(accessToken);

    let newActivitiesCount = 0;
    let updatedRegistrationsCount = 0;

    // Iterate through activities
    for (const activity of stravaActivities) {
      // Check if activity already exists
      const existingActivity = await db.query(
        "SELECT id FROM activities WHERE strava_activity_id = ?",
        [activity.id]
      );

      if (existingActivity.length > 0) {
        continue; // Skip existing activity
      }

      // Insert new activity
      const activityResult = await db.query(
        `INSERT INTO activities (user_id, strava_activity_id, name, distance, start_date, activity_type)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          userId,
          activity.id,
          activity.name,
          activity.distance / 1000, // Convert meters to kilometers
          activity.start_date,
          activity.type,
        ]
      );

      newActivitiesCount++;

      // Find active races that match the activity date
      const activityDate = new Date(activity.start_date);
      const activeRaces = await db.query(
        `SELECT r.id FROM registrations r
         JOIN races rc ON r.race_id = rc.id
         WHERE r.user_id = ? 
         AND r.status = 'active'
         AND ? BETWEEN rc.start_date AND rc.end_date`,
        [userId, activityDate]
      );

      // Update registrations with activity distance
      for (const race of activeRaces) {
        const distanceKm = activity.distance / 1000;
        await db.query(
          `UPDATE registrations 
           SET current_distance = current_distance + ?
           WHERE id = ?`,
          [distanceKm, race.id]
        );
        updatedRegistrationsCount++;
      }
    }

    return {
      success: true,
      newActivitiesCount,
      updatedRegistrationsCount,
      message: `Synced ${newActivitiesCount} activities and updated ${updatedRegistrationsCount} race registrations`,
    };
  } catch (error) {
    console.error("Error syncing user activities:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Fetch activities from Strava API
 * @param {string} accessToken - User's Strava access token
 * @returns {Promise<Array>} Array of activity objects
 */
async function fetchStravaActivities(accessToken) {
  try {
    const response = await axios.get(`${STRAVA_API_BASE}/athlete/activities`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        per_page: 200,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch Strava activities: ${error.message}`);
  }
}

module.exports = { syncUserActivities };
