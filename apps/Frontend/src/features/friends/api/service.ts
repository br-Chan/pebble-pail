import { api } from "#/lib/api-client";
import type { FriendCreateRequest, FriendUpdateRequest } from "../types";

const FriendService = {
	createFriend: async (data: FriendCreateRequest) => {
		const response = await api.POST("/api/Friends", {
			body: data,
		});
		return response.data;
	},

	getFriends: async () => {
		const response = await api.GET("/api/Friends");
		return response;
	},

	getFriendById: async (friendId: string) => {
		const response = await api.GET(`/api/Friends/{id}`, {
			params: { path: { id: friendId } },
		});
		return response;
	},

	updateFriend: async (friendId: string, data: FriendUpdateRequest) => {
		const response = await api.PUT(`/api/Friends/{id}`, {
			params: { path: { id: friendId } },
			body: data,
		});
		return response;
	},

	deleteFriend: async (friendId: string) => {
		const response = await api.DELETE(`/api/Friends/{id}`, {
			params: { path: { id: friendId } },
		});
		return response;
	},
};

export default FriendService;
