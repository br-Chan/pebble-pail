import { createFileRoute } from "@tanstack/react-router";
import { useFriends } from "#/features/friends/api/queries";
import { columns } from "#/features/friends/components/columns";
import { DataTable } from "#/features/friends/components/data-table";

export const Route = createFileRoute("/friends")({
	component: RouteComponent,
});

function RouteComponent() {
	const friendsQuery = useFriends();

	if (friendsQuery.isLoading) {
		return <div>Loading friends...</div>;
	}

	const friends = friendsQuery.data?.data || [];

	if (!friends) {
		return <div>No friends found.</div>;
	}

	return (
		<div className="p-8">
			<h2>Friends</h2>
			<DataTable columns={columns} data={friends} />
		</div>
	);
}
