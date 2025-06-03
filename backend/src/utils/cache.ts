import { redis } from '../lib/redis';
// import { cacheEvents } from '../events/cacheEvents';

type CacheOptions<T> = {
    key: string;
    ttl?: number;
    fetchFn: () => Promise<T>;
    onHit?: () => void;
    onMiss?: () => void;
};

const listeners = new Set<string>();

export async function useCachea<T>({
    key,
    ttl = 300,
    fetchFn,
    onHit,
    onMiss,
}: CacheOptions<T>): Promise<T> {
    if (!listeners.has(key)) {
        // cacheEvents.on('invalidate', (k: string) => {
        //     if (k === key) redis.del(k);
        // });
        // listeners.add(key);
    }

    const cached = await redis.get(key);

    if (cached) {
        onHit?.();
        return JSON.parse(cached) as T;
    }

    onMiss?.();
    const data = await fetchFn();
    await redis.set(key, JSON.stringify(data), 'EX', ttl);
    return data;
}