import axios from "axios";
import env from "../config/env.js";

class EmbeddingService {
    constructor() {
        this.apiUrl = "https://api.jina.ai/v1/embeddings";
        this.model = "jina-clip-v2";
    }

    async generateImageEmbedding(imageBuffer) {
        try {
            const base64Image =
                imageBuffer.toString("base64");

            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    input: [
                        {
                            image: `data:image/jpeg;base64,${base64Image}`
                        }
                    ]
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${env.JINA_API_KEY}`,
                        "Content-Type":
                            "application/json"
                    }
                }
            );

            return response.data.data[0].embedding;

        } catch (error) {
            console.error(
                "Image embedding error:",
                error.response?.data || error.message
            );

            throw error;
        }
    }

    async generateTextEmbedding(text) {
        try {
            const response = await axios.post(
                this.apiUrl,
                {
                    model: this.model,
                    input: [
                        {
                            text
                        }
                    ]
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${env.JINA_API_KEY}`,
                        "Content-Type":
                            "application/json"
                    }
                }
            );

            return response.data.data[0].embedding;

        } catch (error) {
            console.error(
                "Text embedding error:",
                error.response?.data || error.message
            );

            throw error;
        }
    }
}

export default new EmbeddingService();