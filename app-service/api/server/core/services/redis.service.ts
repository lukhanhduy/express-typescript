import redis from 'redis';
const { promisify } = require('util');
export class RedisService {
	private client = redis.createClient();
	private HMgetAsync = promisify(this.client.hget).bind(this.client);
	/**
	 * set redis by module to cache
	 * @param key 
	 * @param field 
	 * @param value 
	 */
	HMSet(key: string, field: string, value: any) {
		return async () => {
			try {
				this.client.hset(key, field, value);
			} catch (error) {
				throw error;
			}
		}
	}
	/**
	 * get redis by key stored 
	 * @param key 
	 * @param field 
	 */
	async HMget(key: string, field: string) {
		return await this.HMgetAsync(key, field)
	}
}