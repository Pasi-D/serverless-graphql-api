import { PrismaClient } from "@prisma/client";
import prisma from "./db";

export interface Context {
    prisma: PrismaClient;
}

const createContext = (): Context => {
    return { prisma };
};

export default createContext;
