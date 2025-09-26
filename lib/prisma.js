import { PrismaClient } from "./generated/prisma";

export const db = global.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalThis.prisma = db;
}