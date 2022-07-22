import { toZod } from "tozod";

export type zodHelper =  toZod<T extends {[key: string]: string}>