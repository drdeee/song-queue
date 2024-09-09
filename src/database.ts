import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

db.trackCache.deleteMany({
  where: {
    createdAt: {
      lt: new Date(new Date().getTime() - 1000 * 60 * 60 * 10),
    },
  },
});
