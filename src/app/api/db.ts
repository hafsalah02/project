import { PrismaClient } from "@prisma/client";

let _db: PrismaClient;
var global_db: PrismaClient | undefined;
if (!global_db) {
  global_db = new PrismaClient();
}
_db = global_db as PrismaClient;

export { _db };
