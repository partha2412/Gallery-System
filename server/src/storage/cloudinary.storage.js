import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default class CloudinaryStorage {

    // Upload image
    async upload(file) {
        return new Promise((resolve, reject) => {

            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "gallery",
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                    });
                }
            );

            uploadStream.end(file.buffer);
        });
    }

    // Delete image
    async delete(publicId) {
        return await cloudinary.uploader.destroy(publicId);
    }
}