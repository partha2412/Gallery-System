import { randomUUID } from "crypto";
import qdrant from "../vector/qdrant.js";
import env from "../config/env.js";

class VectorService {
    constructor() {
        this.collectionName = env.QDRANT_COLLECTION;
        this.vectorSize = null;
    }

    async initializeCollection(vectorSize) {
        const collections = await qdrant.getCollections();

        const exists = collections.collections.some(
            (collection) =>
                collection.name === this.collectionName
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
        if (!embedding || !embedding.length) {
            throw new Error(
                "Invalid embedding"
            );
        }

        // Create collection using embedding dimension
        await this.initializeCollection(
            embedding.length
        );

        // Generate Qdrant vector ID
        const vectorId = randomUUID();

        await qdrant.upsert(
            this.collectionName,
            {
                wait: true,

                points: [
                    {
                        id: vectorId,

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

        console.log(
            `Embedding stored in Qdrant: ${vectorId}`
        );

        return vectorId;
    }

    async searchSimilarImages(
        embedding,
        limit = 10,
        filter = undefined
    ) {
        const queryOptions = {
            query: embedding,
            limit,
            with_payload: true,
        };

        if (filter) {
            queryOptions.filter = filter;
        }

        const results = await qdrant.query(
            this.collectionName,
            queryOptions
        );

        return results.points;
    }
    
    async deleteImageEmbedding(vectorId) {
        await qdrant.delete(
            this.collectionName,
            {
                points: [vectorId],
            }
        );

        console.log(
            `Vector deleted from Qdrant: ${vectorId}`
        );
    }
}

export default new VectorService();