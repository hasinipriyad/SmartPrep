import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 // auto-delete after 1 day (matches JWT expiry)
    }
});

const blackListTokenModel = mongoose.model("BlackListTokens", blackListTokenSchema);

export default blackListTokenModel;