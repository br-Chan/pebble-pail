import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Separator } from "#/components/ui/separator";
import { useGetFriends } from "#/features/friends/api/queries";
import { columns } from "#/features/friends/components/columns";
import { DataTable } from "#/features/friends/components/data-table";

export const Route = createFileRoute("/friends")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({ from: Route.id });

	const friendsQuery = useGetFriends();

	if (friendsQuery.isLoading) {
		return <div>Loading friends...</div>;
	}

	const friends = friendsQuery.data?.data || [];

	if (!friends) {
		return <div>No friends found.</div>;
	}

	return (
		<div>
			<h2 className="border-b p-8">Friends</h2>
			<div className="flex items-center gap-2">
				<DataTable
					className="flex-2 p-8"
					columns={columns}
					data={friends}
					onRowClick={(friend) => navigate({ to: `/friends/${friend.id}` })}
				/>
				<Separator orientation="vertical" />
				<Outlet />
			</div>
		</div>
	);
}
