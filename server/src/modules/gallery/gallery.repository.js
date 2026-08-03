import Gallery from "../../models/gallery.model.js";

export default class GalleryRepo {

    // Create image metadata
    async create(data) {
        return await Gallery.create(data);
    }

    // Get all images of a user
    async findByUserId(userId) {
        return await Gallery.find({ userId })
            .sort({ createdAt: -1 });
    }

    // Get one image
    async findById(imageId) {
        return await Gallery.findById(imageId);
    }

    // Update image
    async update(imageId, data) {
        return await Gallery.findByIdAndUpdate(
            imageId,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    // Delete image metadata
    async delete(imageId) {
        return await Gallery.findByIdAndDelete(imageId);
    }
}