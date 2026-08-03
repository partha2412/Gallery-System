import express from "express";
import GalleryController from "./gallery.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import {verifyAccessToken} from "../../validation/validationAccessToken.js";
import upload from "../../middlewares/upload.middleware.js";

const galleryRoutes = express.Router();

const galleryController = new GalleryController();

// Upload an image
galleryRoutes.post(
    "/",
    verifyAccessToken,
    upload.single('image'),
    asyncHandler(
        galleryController.uploadImageController.bind(galleryController)
    )
);

// Get all images of logged-in user
galleryRoutes.get(
    "/",
    verifyAccessToken,
    asyncHandler(
        galleryController.getImagesController.bind(galleryController)
    )
);

// Get one image
galleryRoutes.get(
    "/:imageId",
    verifyAccessToken,
    asyncHandler(
        galleryController.getImageController.bind(galleryController)
    )
);

// Update image metadata/name
galleryRoutes.patch(
    "/:imageId",
    verifyAccessToken,
    asyncHandler(
        galleryController.updateImageController.bind(galleryController)
    )
);

// Delete image
galleryRoutes.delete(
    "/:imageId",
    verifyAccessToken,
    asyncHandler(
        galleryController.deleteImageController.bind(galleryController)
    )
);

export default galleryRoutes;