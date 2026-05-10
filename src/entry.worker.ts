/// <reference types="@cloudflare/workers-types" />
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

export default {
	fetch: createStartHandler(defaultStreamHandler),
};
