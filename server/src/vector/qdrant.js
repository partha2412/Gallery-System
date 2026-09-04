import { QdrantClient } from "@qdrant/js-client-rest";
import env from "../config/env.js";

const qdrant = new QdrantClient({
    url: env.QDRANT_URL,
    apiKey: env.QDRANT_API_KEY || undefined,
});

export default qdrant;