import { ICacheProvider } from "../ICacheProvider";
import Redis from "ioredis";

export class RedisCacheProvider implements ICacheProvider {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379
        });
    }

    async getOrSet<T>({
        key,
        ttl,
        fetchFn,
        onHit,
        onMiss,
    }: {
        key: string;
        ttl: number;
        fetchFn: () => Promise<T>;
        onHit?: () => void;
        onMiss?: () => void;
    }): Promise<T> {
        const cached = await this.client.get(key);

        if (cached) {
            onHit?.();
            return JSON.parse(cached) as T;
        }

        onMiss?.();

        const value = await fetchFn();
        await this.client.set(key, JSON.stringify(value), "EX", ttl);
        return value;
    }

    async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}