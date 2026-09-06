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

import {
    showError,
    showLoading,
    showSuccess,
} from "../utils/toast";

import {
    getAllGalleryImages,
    getGalleryImages,
    uploadGalleryImage,
    deleteGalleryImage,
    searchGalleryImages,
} from "../api/gallery.api";

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [search, setSearch] = useState("");
    const [searching, setSearching] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);
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
            showLoading("Uploading...");
            setUploading(true);

            const res = await uploadGalleryImage(file);

            showSuccess(res.message);

            await fetchImages();
        } catch (error) {
            showError(error.message);
        } finally {
            setUploading(false);

            // Allows selecting the same file again
            event.target.value = "";
        }
    };

    // ---------------------------------------
    // DELETE IMAGE
    // ---------------------------------------

    const handleDelete = async (imageId) => {
        try {
            showLoading("Deleting...");

            await deleteGalleryImage(imageId);

            setImages((previousImages) =>
                previousImages.filter(
                    (image) => image._id !== imageId
                )
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

    const handleSearch = async () => {
        if (!search.trim()) {
            await fetchImages();
            return;
        }

        try {
            setSearching(true);

            const response = await searchGalleryImages(
                search.trim(),
                viewMode
            );

            setImages(response.images || []);
        } catch (error) {
            console.error(
                "Semantic search failed:",
                error
            );

            showError(
                error.response?.data?.message ||
                "Search failed"
            );
        } finally {
            setSearching(false);
        }
    };

    const filteredImages = images;

    return (
        <main className="min-h-screen bg-[#f7f5f1] text-[#171717]">

            {/* ========================================= */}
            {/* PAGE */}
            {/* ========================================= */}

            <div className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">

                {/* ===================================== */}
                {/* HEADER */}
                {/* ===================================== */}

                <header className="mb-9">

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

                        {/* Title */}

                        <div>

                            <div className="mb-3 flex items-center gap-2.5">

                                <span className="h-1.5 w-1.5 rounded-full bg-[#9a8055]" />

                                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9a8055]">
                                    Your collection
                                </p>

                            </div>

                            <h1 className="text-[32px] font-semibold tracking-[-0.045em] text-[#171717] sm:text-[38px]">
                                Gallery
                            </h1>

                            <p className="mt-2 text-sm text-[#77736d]">
                                Browse, manage and search your photos.
                            </p>

                        </div>

                        {/* ================================= */}
                        {/* VIEW SWITCHER */}
                        {/* ================================= */}

                        <div className="flex w-fit items-center rounded-xl border border-[#dedbd4] bg-[#efede8] p-1">

                            <button
                                type="button"
                                onClick={() => setViewMode("mine")}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${viewMode === "mine"
                                        ? "bg-[#1b1b1a] text-white shadow-sm"
                                        : "text-[#77736d] hover:text-[#242321]"
                                    }`}
                            >
                                My Images
                            </button>

                            <button
                                type="button"
                                onClick={() => setViewMode("all")}
                                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${viewMode === "all"
                                        ? "bg-[#1b1b1a] text-white shadow-sm"
                                        : "text-[#77736d] hover:text-[#242321]"
                                    }`}
                            >
                                All Images
                            </button>

                        </div>

                    </div>

                </header>

                {/* ===================================== */}
                {/* TOOLBAR */}
                {/* ===================================== */}

                <section className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    {/* Search */}

                    <div className="group flex h-11 w-full max-w-xl items-center rounded-xl border border-[#dedbd4] bg-[#fbfaf8] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 focus-within:border-[#b9ad98] focus-within:shadow-[0_0_0_3px_rgba(154,128,85,0.07)]">

                        <Search
                            size={17}
                            strokeWidth={1.7}
                            className="ml-4 shrink-0 text-[#aaa49b] transition-colors group-focus-within:text-[#7c6a4e]"
                        />

                        <input
                            type="text"
                            placeholder="Search your photos..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (
                                    e.key === "Enter" &&
                                    !searching
                                ) {
                                    handleSearch();
                                }
                            }}
                            className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-[#242321] outline-none placeholder:text-[#aaa49b]"
                        />

                        <button
                            type="button"
                            onClick={handleSearch}
                            disabled={searching}
                            className={`mr-1.5 flex h-8 w-8 items-center justify-center rounded-lg transition ${searching
                                    ? "cursor-not-allowed text-[#c8c4bd]"
                                    : "text-[#99938a] hover:bg-[#efede8] hover:text-[#4b463e]"
                                }`}
                        >
                            <Search size={16} />
                        </button>

                    </div>

                    {/* Actions */}

                    <div className="flex items-center justify-between gap-3 lg:justify-end">

                        {/* Counter */}

                        <div className="flex h-11 items-center gap-2 rounded-xl border border-[#dedbd4] bg-[#fbfaf8] px-4">

                            <Images
                                size={15}
                                strokeWidth={1.7}
                                className="text-[#99938a]"
                            />

                            <span className="text-sm font-medium text-[#4d4943]">
                                {filteredImages.length}
                            </span>

                            <span className="hidden text-sm text-[#99938a] sm:inline">
                                photos
                            </span>

                        </div>

                        {/* File Input */}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            className="hidden"
                        />

                        {/* Upload */}

                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            disabled={uploading}
                            className="flex h-11 items-center gap-2 rounded-xl bg-[#1b1b1a] px-4 text-sm font-medium text-white shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition-all duration-200 hover:bg-[#292826] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <ImagePlus
                                size={17}
                                strokeWidth={1.7}
                            />

                            <span>
                                {uploading
                                    ? "Uploading..."
                                    : "Add photo"}
                            </span>
                        </button>

                    </div>

                </section>

                {/* ===================================== */}
                {/* LOADING */}
                {/* ===================================== */}

                {loading && (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                        {Array.from({ length: 12 }).map(
                            (_, index) => (
                                <div
                                    key={index}
                                    className="aspect-square animate-pulse rounded-2xl border border-[#e2dfd8] bg-[#eeece7]"
                                />
                            )
                        )}

                    </div>
                )}

                {/* ===================================== */}
                {/* EMPTY GALLERY */}
                {/* ===================================== */}

                {!loading && images.length === 0 && (
                    <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-[#d8d4cc] bg-[#fbfaf8]">

                        <div className="flex max-w-sm flex-col items-center px-6 text-center">

                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dedbd4] bg-[#f1efe9] text-[#8c806d]">
                                <ImagePlus
                                    size={24}
                                    strokeWidth={1.5}
                                />
                            </div>

                            <h2 className="text-lg font-semibold tracking-[-0.02em] text-[#242321]">
                                Your gallery is empty
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-[#88837b]">
                                Add your first photo and start
                                building your personal collection.
                            </p>

                            <button
                                type="button"
                                onClick={() =>
                                    fileInputRef.current?.click()
                                }
                                className="mt-6 flex h-10 items-center gap-2 rounded-xl bg-[#1b1b1a] px-4 text-sm font-medium text-white transition hover:bg-[#292826]"
                            >
                                <ImagePlus size={16} />
                                Upload photo
                            </button>

                        </div>

                    </div>
                )}

                {/* ===================================== */}
                {/* NO SEARCH RESULTS */}
                {/* ===================================== */}

                {!loading &&
                    images.length > 0 &&
                    filteredImages.length === 0 && (
                        <div className="flex min-h-[420px] items-center justify-center rounded-2xl border border-[#dedbd4] bg-[#fbfaf8]">

                            <div className="text-center">

                                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dedbd4] bg-[#f1efe9]">

                                    <Search
                                        size={24}
                                        strokeWidth={1.5}
                                        className="text-[#958c7e]"
                                    />

                                </div>

                                <h2 className="text-lg font-semibold text-[#242321]">
                                    No photos found
                                </h2>

                                <p className="mt-2 text-sm text-[#88837b]">
                                    Try another search.
                                </p>

                            </div>

                        </div>
                    )}

                {/* ===================================== */}
                {/* IMAGE GRID */}
                {/* ===================================== */}

                {!loading &&
                    filteredImages.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">

                            {filteredImages.map((image) => (
                                <article
                                    key={image._id}
                                    onClick={() =>
                                        setSelectedImage(image)
                                    }
                                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-[#dedbd4] bg-[#ebe8e1] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-[1px] hover:border-[#c5bba9] hover:shadow-[0_12px_30px_-15px_rgba(0,0,0,0.25)]"
                                >

                                    {/* Image */}

                                    <div className="absolute inset-0 overflow-hidden">

                                        <img
                                            src={image.url}
                                            alt={image.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                                        />

                                    </div>

                                    {/* Gradient */}

                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                    {/* Image information */}

                                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3.5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">

                                        <div className="flex items-end gap-3">

                                            <p
                                                title={image.name}
                                                className="min-w-0 flex-1 truncate text-sm font-medium text-white"
                                            >
                                                {image.name}
                                            </p>

                                            <button
                                                type="button"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleDelete(
                                                        image._id
                                                    );
                                                }}
                                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black/30 text-white/75 backdrop-blur-md transition hover:border-red-300/30 hover:bg-red-500/10 hover:text-red-200"
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

            {/* ===================================== */}
            {/* IMAGE PREVIEW MODAL */}
            {/* ===================================== */}

            {selectedImage && (
                <div
                    onClick={() => setSelectedImage(null)}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#11100e]/90 p-4 backdrop-blur-xl sm:p-8"
                >

                    {/* Close */}

                    <button
                        type="button"
                        onClick={() =>
                            setSelectedImage(null)
                        }
                        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-white/60 backdrop-blur-xl transition hover:bg-white/[0.12] hover:text-white sm:right-6 sm:top-6"
                    >
                        <X size={19} />
                    </button>

                    {/* Modal */}

                    <div
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-[#191816] shadow-[0_30px_80px_-25px_rgba(0,0,0,0.65)]"
                    >

                        {/* Preview */}

                        <div className="flex min-h-0 flex-1 items-center justify-center bg-[#11100f] p-2 sm:p-4">

                            <img
                                src={selectedImage.url}
                                alt={selectedImage.name}
                                className="max-h-[76vh] max-w-full rounded-xl object-contain"
                            />

                        </div>

                        {/* Modal Footer */}

                        <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] bg-[#191816] px-4 py-3.5 sm:px-5">

                            {/* Details */}

                            <div className="min-w-0">

                                <p
                                    title={selectedImage.name}
                                    className="truncate text-sm font-medium text-white/90"
                                >
                                    {selectedImage.name}
                                </p>

                                {selectedImage.size && (
                                    <p className="mt-0.5 text-xs text-white/35">
                                        {(
                                            selectedImage.size /
                                            1024 /
                                            1024
                                        ).toFixed(2)}{" "}
                                        MB
                                    </p>
                                )}

                            </div>

                            {/* Actions */}

                            <div className="flex shrink-0 items-center gap-1.5">

                                {/* Download */}

                                <a
                                    href={selectedImage.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition hover:bg-white/[0.09] hover:text-white"
                                >
                                    <Download size={16} />
                                </a>

                                {/* Delete */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            selectedImage._id
                                        )
                                    }
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition hover:border-red-300/20 hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <Trash2 size={16} />
                                </button>

                                {/* More */}

                                <button
                                    type="button"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-white/50 transition hover:bg-white/[0.09] hover:text-white"
                                >
                                    <MoreHorizontal size={17} />
                                </button>

                            </div>

                        </div>

                    </div>

                </div>
            )}
        </main>
    );
}