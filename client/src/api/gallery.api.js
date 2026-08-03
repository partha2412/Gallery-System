import api from "./axios";

export const getGalleryImages = async () => {
    const response = await api.get("/api/v1/gallery");
    return response.data;
};

export const uploadGalleryImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post("/api/v1/gallery", formData);

    return response.data;
};

export const deleteGalleryImage = async (imageId) => {
    const response = await api.delete(`/api/v1/gallery/${imageId}`);

    return response.data;
};