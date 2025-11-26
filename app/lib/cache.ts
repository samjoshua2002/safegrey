// lib/cache.ts
import NodeCache from 'node-cache'

export const cache = new NodeCache({ stdTTL: 3600 }) // 1 hour cache