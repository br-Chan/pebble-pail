import { api } from "#/lib/api-client";

const FriendService = {
	createFriend: async (friendData: any) => {
		const response = api.POST("/api/Friends", friendData);
		return response;
	},

	getFriends: async () => {
		const response = api.GET("/api/Friends");
		return response;
	},

	getFriendById: async (friendId: string) => {
		const response = api.GET(`/api/Friends/{id}`, {
			params: { path: { id: friendId } },
		});
		return response;
	},

	updateFriend: async (friendId: string, friendData: any) => {
		const response = api.PUT(`/api/Friends/{id}`, {
			params: { path: { id: friendId } },
			body: friendData,
		});
		return response;
	},

	deleteFriend: async (friendId: string) => {
		const response = api.DELETE(`/api/Friends/{id}`, {
			params: { path: { id: friendId } },
		});
		return response;
	},
};

export default FriendService;
