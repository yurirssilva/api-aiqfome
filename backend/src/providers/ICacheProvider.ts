export interface ICacheProvider {
    getOrSet<T>(params: {
        key: string;
        ttl: number;
        fetchFn: () => Promise<T>;
        onHit?: () => void;
        onMiss?: () => void;
    }): Promise<T>;

    invalidate(key: string): Promise<void>;
}
