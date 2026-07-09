import Axios, { type InternalAxiosRequestConfig } from "axios";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
	if (config.headers) {
		config.headers.accept = "application/json";
	}

	config.withCredentials = true; // TODO: change this.
	return config;
};

export const api = Axios.create({
	baseURL: "/api",
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	},
);
