import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
    createTweet,
    deleteTweet,
    get_user_tweet,
    updateTweet,
} from "../controllers/tweet.controller.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(verifyAccessToken);

// Create a new tweet
router.post("/", createTweet);

// Get tweets of a specific user
router.get("/:userId", get_user_tweet);

// Update a specific tweet
router.put("/:tweetId", updateTweet);

// Delete a specific tweet
router.delete("/:tweetId", deleteTweet);

export default router;
