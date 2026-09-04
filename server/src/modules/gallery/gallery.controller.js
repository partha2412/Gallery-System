import GalleryService from "../../service/gallery.service.js";

export default class GalleryController {
    constructor() {
        this.galleryService = new GalleryService();
    }

    // Upload image
    async uploadImageController(req, res) {        
        const image = await this.galleryService.uploadImageService(
            req.user.id,
            req.file
        );
        return res.status(201).json({
            message: "Image uploaded successfully",
            image,
        });
    }

    // Get all images
    async getAllImagesController(req, res) {
        const images = await this.galleryService.getAllImagesService(
            req.user.id
        );

        return res.status(200).json({
            message: "All Images fetched successfully",
            images,
        });
    }

    // Get all images of logged-in user
    async getImagesController(req, res) {
        const images = await this.galleryService.getImagesService(
            req.user.id
        );

        return res.status(200).json({
            message: "Images fetched successfully",
            images,
        });
    }

    // Get one image
    async getImageController(req, res) {
        const image = await this.galleryService.getImageService(
            req.params.imageId,
            req.user.id
        );

        return res.status(200).json({
            image,
        });
    }

    async searchImagesController(req, res) {
        try {
            const { query, scope = "mine" } = req.body;

            const images =
                await this.galleryService.searchImagesService(
                    query,
                    req.user.id,
                    scope
                );

            return res.status(200).json({
                success: true,
                images,
            });

        } catch (error) {
            console.error("SEARCH ERROR:", error);

            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Update image
    async updateImageController(req, res) {
        const image = await this.galleryService.updateImageService(
            req.params.imageId,
            req.user.id,
            req.body
        );

        return res.status(200).json({
            message: "Image updated successfully",
            image,
        });
    }

    // Delete image
    async deleteImageController(req, res) {
        await this.galleryService.deleteImageService(
            req.params.imageId,
            req.user.id
        );

        return res.status(200).json({
            message: "Image deleted successfully",
        });
    }
}