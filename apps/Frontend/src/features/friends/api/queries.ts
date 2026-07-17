import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import type { FriendCreateRequest, FriendUpdateRequest } from "../types";
import FriendService from "./service";

export const friendsQueryOptions = () => {
	return queryOptions({
		queryKey: ["friends"],
		queryFn: FriendService.getFriends,
	});
};

export const useGetFriends = () => {
	return useQuery(friendsQueryOptions());
};

export const useGetFriend = (friendId: string) => {
	return useQuery({
		queryKey: ["friends", friendId],
		queryFn: () => FriendService.getFriendById(friendId),
	});
};

export const useCreateFriend = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: FriendCreateRequest) => FriendService.createFriend(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: friendsQueryOptions().queryKey,
			});
		},
	});
};

export const useUpdateFriend = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: FriendUpdateRequest }) =>
			FriendService.updateFriend(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: friendsQueryOptions().queryKey,
			});
		},
	});
};

export const useDeleteFriend = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (friendId: string) => FriendService.deleteFriend(friendId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: friendsQueryOptions().queryKey,
			});
		},
	});
};
