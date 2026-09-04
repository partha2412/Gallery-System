import qdrant from "../vector/qdrant.js";
import env from "../config/env.js";

class VectorService {
    constructor() {
        this.collectionName =
            env.QDRANT_COLLECTION;
    }

    async initializeCollection(vectorSize) {
        const collections =
            await qdrant.getCollections();

        const exists =
            collections.collections.some(
                (collection) =>
                    collection.name ===
                    this.collectionName
            );

        if (exists) {
            return;
        }

        await qdrant.createCollection(
            this.collectionName,
            {
                vectors: {
                    size: vectorSize,
                    distance: "Cosine",
                },
            }
        );

        console.log(
            `Qdrant collection created: ${this.collectionName}`
        );
    }

    async storeImageEmbedding({
        imageId,
        userId,
        embedding,
    }) {
        await this.initializeCollection(
            embedding.length
        );

        await qdrant.upsert(
            this.collectionName,
            {
                wait: true,

                points: [
                    {
                        id: imageId.toString(),

                        vector: embedding,

                        payload: {
                            imageId:
                                imageId.toString(),

                            userId:
                                userId.toString(),

                            type: "image",
                        },
                    },
                ],
            }
        );

        return imageId.toString();
    }
}

export default new VectorService();