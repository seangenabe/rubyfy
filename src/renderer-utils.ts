import { RubyPair } from "./ruby-pair.js";

export interface RendererOptions {
  openRp?: string;
  closeRp?: string;
}

export function isRubyPair<T>(obj: T): obj is T & RubyPair {
  return hasRt(obj);
}

export function hasRb<T>(obj: T): obj is T & { rb: string } {
  return typeof obj === "object" && obj != null && "rb" in obj;
}

export function hasRt<T>(obj: T): obj is T & { rt: string } {
  return typeof obj === "object" && obj != null && "rt" in obj;
}
