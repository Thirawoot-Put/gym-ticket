import redis from "@/config/redis"

export const setex = async (key: string, value: string, expireTimeInSecond: number) => {
  await redis.setex(key, expireTimeInSecond, value)
}

export const del = async (...key: Array<string>) => {
  await redis.del(key)
}
