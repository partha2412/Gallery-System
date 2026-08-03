import { Schema, model } from "mongoose";

const gallerySchema = new Schema(
    {
        // Owner of the image
        userId: {
            type: Schema.Types.ObjectId,
            ref: "userModel",
            required: true,
            index: true,
        },

        // Original image name
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Cloudinary public_id
        // Used when deleting/updating image in Cloudinary
        storageKey: {
            type: String,
            required: true,
            unique: true,
        },

        // Cloudinary image URL
        url: {
            type: String,
            required: true,
        },

        // Example: image/jpeg, image/png
        mimeType: {
            type: String,
        },

        // File size in bytes
        size: {
            type: Number,
        },
        embedding: {
            type: [Number],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const galleryModel = model("galleryModel", gallerySchema);

export default galleryModel;