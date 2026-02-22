import { z } from "zod";
import { insertPostSchema, posts } from "./schema";

export const errorSchemas = {
  internal: z.object({ message: z.string() })
};

export const api = {
  posts: {
    list: {
      method: 'GET' as const,
      path: '/api/posts' as const,
      responses: {
        200: z.array(z.custom<typeof posts.$inferSelect>()),
      }
    }
  },
  token: {
    stats: {
      method: 'GET' as const,
      path: '/api/token/stats' as const,
      responses: {
        200: z.any(),
        500: errorSchemas.internal
      }
    },
    holders: {
      method: 'GET' as const,
      path: '/api/token/holders' as const,
      responses: {
        200: z.any(),
        500: errorSchemas.internal
      }
    },
    transfers: {
      method: 'GET' as const,
      path: '/api/token/transfers' as const,
      responses: {
        200: z.any(),
        500: errorSchemas.internal
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PostResponse = typeof posts.$inferSelect;