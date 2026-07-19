import { createFileRoute } from "@tanstack/react-router";
import { useGetFriend } from "#/features/friends/api/queries";
import { PenguinInformation } from "#/features/friends/components/penguin-information";

export const Route = createFileRoute("/friends/$friendId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { friendId } = Route.useParams();

	const { isLoading, error, data } = useGetFriend(friendId);

	if (isLoading) {
		return <div>Loading friend...</div>;
	}
	if (error) {
		return <div>Error loading friend: {error.message}</div>;
	}

	const friend = data?.data;

	if (!friend) {
		return <div>Friend not found.</div>;
	}

	return <PenguinInformation friend={friend} />;
}
