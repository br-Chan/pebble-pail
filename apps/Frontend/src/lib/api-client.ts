import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "#/types/api";

const middleware: Middleware = {
	async onRequest({ request }) {
		request.headers.set("Accept", "application/json");
		return request;
	},
};

export const api = createClient<paths>({
	baseUrl: import.meta.env.VITE_API_BASE_URL,
});

api.use(middleware);
