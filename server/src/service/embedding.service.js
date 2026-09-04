import { pipeline } from "@huggingface/transformers";
import sharp from "sharp";

class EmbeddingService {
    constructor() {
        this.extractor = null;
    }

    async initialize() {
        if (this.extractor) {
            return;
        }

        console.log("Loading CLIP model...");

        this.extractor = await pipeline(
            "image-feature-extraction",
            "Xenova/clip-vit-base-patch32"
        );

        console.log("CLIP model loaded");
    }

    async generateImageEmbedding(buffer) {
        await this.initialize();

        const imageBuffer = await sharp(buffer)
            .jpeg()
            .toBuffer();

        const imageBlob = new Blob(
            [imageBuffer],
            {
                type: "image/jpeg",
            }
        );

        const output = await this.extractor(
            imageBlob,
            {
                pooling: "mean",
                normalize: true,
            }
        );

        return Array.from(output.data);
    }
}

export default new EmbeddingService();