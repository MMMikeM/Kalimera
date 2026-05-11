import { db } from "../index";

/** Drizzle transaction client passed into multi-step mutations. */
export type DbTransaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
