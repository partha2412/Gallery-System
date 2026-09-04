import GalleryRepo from "../repository/gallery.repository.js";
import CloudinaryStorage from "../storage/cloudinary.storage.js";
import embeddingService from "./embedding.service.js";
import vectorService from "./vector.service.js";

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

        // 1. Upload image to Cloudinary
        const uploadedImage =
            await this.storage.upload(file);

        // 2. Create MongoDB document first
        const image = await this.galleryRepo.create({
            userId,
            name: file.originalname,
            storageKey: uploadedImage.publicId,
            url: uploadedImage.url,
            mimeType: file.mimetype,
            size: file.size,
        });

        // 3. Generate embedding
        const embedding =
            await embeddingService.generateImageEmbedding(
                file.buffer
            );

        // 4. Store embedding in Qdrant
        const vectorId =
            await vectorService.storeImageEmbedding({
                imageId: image._id,
                userId,
                embedding,
            });

        // 5. Save vectorId in MongoDB
        await this.galleryRepo.update(
            image._id,
            { vectorId }
        );

        image.vectorId = vectorId;

        return image;
    }

    // Get all images
    async getAllImagesService() {
        return await this.galleryRepo.findAll();
    }

    // Get all images of an user
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

    async searchImagesService(query) {
        if (!query || !query.trim()) {
            throw new Error("Search query is required");
        }

        // Text → embedding
        const embedding =
            await embeddingService.generateTextEmbedding(
                query
            );

        // Search Qdrant
        const results =
            await vectorService.searchSimilarImages(
                embedding,
                10
            );

        // Extract MongoDB image IDs
        const imageIds = results.map(
            (result) => result.payload.imageId
        );

        // Get actual images from MongoDB
        const images =
            await this.galleryRepo.findByIds(imageIds);

        // Preserve Qdrant similarity order
        const imageMap = new Map(
            images.map((image) => [
                image._id.toString(),
                image
            ])
        );

        return results
            .map((result) => ({
                ...imageMap.get(
                    result.payload.imageId
                )?.toObject(),
                score: result.score
            }))
            .filter(Boolean);
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

        if (
            image.userId.toString() !==
            userId.toString()
        ) {
            throw new Error("Unauthorized");
        }

        // Delete vector from Qdrant
        if (image.vectorId) {
            await vectorService.deleteImageEmbedding(
                image.vectorId
            );
        }

        // Delete actual image from Cloudinary
        await this.storage.delete(image.storageKey);

        // Delete metadata from MongoDB
        await this.galleryRepo.delete(imageId);

        return true;
    }
}