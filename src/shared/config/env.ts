import dotenv from 'dotenv';
import path from 'path';

export const NODE_ENV = process.env.NODE_ENV as string;

dotenv.config({ path: path.resolve(__dirname, `../../../.env`) });

export const PORT = process.env.PORT || 9090;

export const REDIS_URL = process.env.REDIS_URL as string;

export const MONGO_DB_URI = process.env.MONGO_DB_URI as string
