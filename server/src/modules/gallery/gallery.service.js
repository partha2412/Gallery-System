import GalleryRepo from "./gallery.repository.js";
import CloudinaryStorage from "../../storage/cloudinary.storage.js";

export default class GalleryService {
    constructor() {
        this.galleryRepo = new GalleryRepo();
        this.storage = new CloudinaryStorage();
    }

    // Upload image
    async uploadImageService(userId, file) {
        if (!file) {
            throw new Error("Image is required");
        }

        // Upload actual image to Cloudinary
        const uploadedImage = await this.storage.upload(file);

        // Save image information in MongoDB
        const image = await this.galleryRepo.create({
            userId,
            name: file.originalname,
            storageKey: uploadedImage.publicId,
            url: uploadedImage.url,
            mimeType: file.mimetype,
            size: file.size,
        });

        return image;
    }

    // Get all images
    async getImagesService(userId) {        
        return await this.galleryRepo.findByUserId(userId);
    }

    // Get one image
    async getImageService(imageId, userId) {
        const image = await this.galleryRepo.findById(imageId);

        if (!image) {
            throw new Error("Image not found");
        }

        // Security check
        if (image.userId.toString() !== userId.toString()) {
            throw new Error("Unauthorized");
        }

        return image;
    }

    // Update image name/details
    async updateImageService(imageId, userId, data) {
        const image = await this.galleryRepo.findById(imageId);

        if (!image) {
            throw new Error("Image not found");
        }

        if (image.userId.toString() !== userId.toString()) {
            throw new Error("Unauthorized");
        }

        return await this.galleryRepo.update(imageId, data);
    }

    // Delete image
    async deleteImageService(imageId, userId) {
        const image = await this.galleryRepo.findById(imageId);

        if (!image) {
            throw new Error("Image not found");
        }

        if (image.userId.toString() !== userId.toString()) {
            throw new Error("Unauthorized");
        }

        // Delete actual image from Cloudinary
        await this.storage.delete(image.storageKey);

        // Delete metadata from MongoDB
        await this.galleryRepo.delete(imageId);

        return true;
    }
}