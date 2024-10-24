import dotenv from 'dotenv';
import path from 'path';

export const NODE_ENV = process.env.NODE_ENV as string;
export const NODE_ENV_ADMIN = process.env.NODE_ENV_ADMIN as string;
export const SERVER_MODE = process.env.SERVER_MODE as string;

dotenv.config({ path: path.resolve(__dirname, `../../env/${NODE_ENV}.env`) });

export const PORT = process.env.PORT || 9090;

export const REDIS_URL = process.env.REDIS_URL as string;
