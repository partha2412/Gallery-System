import { useEffect, useRef, useState } from "react";
import {
    ImagePlus,
    Search,
    Trash2,
    Download,
    MoreHorizontal,
    X,
    Images,
} from "lucide-react";
import { showError, showLoading, showSuccess } from '../utils/toast';
import {
    getAllGalleryImages,
    getGalleryImages,
    uploadGalleryImage,
    deleteGalleryImage,
} from "../api/gallery.api.js";

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [viewMode, setViewMode] = useState("mine");

    const fileInputRef = useRef(null);

    // ---------------------------------------
    // GET ALL IMAGES
    // ---------------------------------------

    const fetchImages = async () => {
        try {
            setLoading(true);

            const data =
                viewMode === "mine"
                    ? await getGalleryImages()
                    : await getAllGalleryImages();

            setImages(data?.images || []);
        } catch (error) {
            showError(error.message);
            setImages([]);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchImages();
    }, [viewMode]);

    // ---------------------------------------
    // UPLOAD IMAGE
    // ---------------------------------------

    const handleUpload = async (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            showLoading('Uploading...')
            setUploading(true);

            const res = await uploadGalleryImage(file);
            showSuccess(res.message);
            // Refresh gallery after upload
            await fetchImages();
        } catch (error) {
            showError(error.message);
            // console.error("Upload failed:", error);
        } finally {
            setUploading(false);

            // allows selecting same file again
            event.target.value = "";
        }
    };

    // ---------------------------------------
    // DELETE IMAGE
    // ---------------------------------------

    const handleDelete = async (imageId) => {
        try {
            showLoading("Deleting...")
            await deleteGalleryImage(imageId);

            setImages((previousImages) =>
                previousImages.filter((image) => image._id !== imageId)
            );

            if (selectedImage?._id === imageId) {
                setSelectedImage(null);
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    // ---------------------------------------
    // SEARCH
    // ---------------------------------------

    const filteredImages = images.filter((image) =>
        image.name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <main className="page">
            <div className="container section">

                {/* -------------------------------- */}
                {/* PAGE TITLE */}
                {/* -------------------------------- */}

                <section className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="subtitle">
                            Your collection
                        </p>

                        <h1 className="heading-xl">
                            Gallery
                        </h1>

                    </div>

                </section>

                {/* selection */}

                <section className="toolbar">

                    <div className="gallery-filter gap-10 flex">

                        <button
                            className={`filter-btn ${viewMode === "mine" ? "active" : ""}`}
                            onClick={() => setViewMode("mine")}
                        >
                            My Images
                        </button>

                        <button
                            className={`filter-btn ${viewMode === "all" ? "active" : ""}`}
                            onClick={() => setViewMode("all")}
                        >
                            All Images
                        </button>

                    </div>

                </section>

                {/* -------------------------------- */}
                {/* TOOLBAR */}
                {/* -------------------------------- */}

                <section className="toolbar">

                    {/* Search */}

                    <div className="search-box">
                        <Search size={17} className="icon" />

                        <input
                            type="text"
                            placeholder="Search your photos"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="input"
                        />
                    </div>

                    {/* Upload Button */}
                    <div className="flex gap-10" >
                        <div className="gallery-counter">
                            <Images size={16} />

                            {filteredImages.length}
                        </div>

                        <div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleUpload}
                                className="hidden"
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={uploading}
                                className="btn btn-primary"
                            >
                                <ImagePlus size={20} />
                                <span>
                                    {uploading ? "Uploading..." : "Add photo"}
                                </span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* -------------------------------- */}
                {/* LOADING */}
                {/* -------------------------------- */}

                {loading && (
                    <div className="gallery-grid">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div
                                key={index}
                                className="card skeleton-card"
                            />
                        ))}
                    </div>
                )}

                {/* -------------------------------- */}
                {/* EMPTY GALLERY */}
                {/* -------------------------------- */}

                {!loading && images.length === 0 && (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <ImagePlus size={25} strokeWidth={1.6} />
                        </div>

                        <h2 className="heading-md">
                            Your gallery is empty
                        </h2>

                        <p className="text">
                            Add your first photo and start building your personal
                            collection.
                        </p>

                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="btn btn-primary mt-6"
                        >
                            Upload photo
                        </button>
                    </div>
                )}

                {/* -------------------------------- */}
                {/* NO SEARCH RESULTS */}
                {/* -------------------------------- */}

                {!loading &&
                    images.length > 0 &&
                    filteredImages.length === 0 && (
                        <div className="empty-state">
                            <Search
                                size={28}
                                strokeWidth={1.5}
                                className="icon"
                            />

                            <h2 className="heading-md">
                                No photos found
                            </h2>

                            <p className="text">
                                Try another search.
                            </p>
                        </div>
                    )}

                {/* -------------------------------- */}
                {/* IMAGE GRID */}
                {/* -------------------------------- */}

                {!loading && filteredImages.length > 0 && (
                    <div className="gallery-grid">

                        {filteredImages.map((image) => (
                            <article
                                key={image._id}
                                onClick={() => setSelectedImage(image)}
                                className="card gallery-card group"
                            >
                                <div className="gallery-image">

                                    <img
                                        src={image.url}
                                        alt={image.name}
                                        loading="lazy"
                                    />

                                </div>

                                {/* Hover overlay */}

                                <div className="gallery-overlay" />

                                {/* Image name */}

                                <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                                    <div className="flex items-center justify-between gap-3">

                                        <p className="gallery-title w-[75%]">
                                            {image.name}
                                        </p>

                                        <button
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleDelete(image._id);
                                            }}
                                            className="icon-btn"
                                        >
                                            <Trash2 size={14} />
                                        </button>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>
                )}

            </div>

            {/* -------------------------------- */}
            {/* IMAGE PREVIEW MODAL */}
            {/* -------------------------------- */}

            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="modal"
                >

                    {/* Close */}

                    <button
                        onClick={() => setSelectedImage(null)}
                        className="icon-btn"
                    >
                        <X size={20} />
                    </button>

                    {/* Image */}

                    <div
                        onClick={(event) => event.stopPropagation()}
                        className="modal-content"
                    >
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.name}
                            className="modal-image"
                        />

                        {/* Bottom Controls */}

                        <div className="modal-footer">

                            <div className="min-w-0">
                                <p className="gallery-title">
                                    {selectedImage.name}
                                </p>

                                {selectedImage.size && (
                                    <p className="caption">
                                        {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">

                                <a
                                    href={selectedImage.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="icon-btn"
                                >
                                    <Download size={17} />
                                </a>

                                <button
                                    onClick={() => handleDelete(selectedImage._id)}
                                    className="icon-btn icon-danger"
                                >
                                    <Trash2 size={17} />
                                </button>

                                <button className="icon-btn">
                                    <MoreHorizontal size={18} />
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            )}

        </main>
    );
}