import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Separator } from "#/components/ui/separator";
import { useGetFriends } from "#/features/friends/api/queries";
import { columns } from "#/features/friends/components/columns";
import { DataTable } from "#/features/friends/components/data-table";
import { Penguin } from "#/features/friends/components/penguin";

export const Route = createFileRoute("/friends")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate({ from: Route.id });

	const getFriendsQuery = useGetFriends();

	if (getFriendsQuery.isLoading) {
		return <div>Loading friends...</div>;
	}

	const friends = getFriendsQuery.data?.data || [];

	if (!friends) {
		return <div>No friends found.</div>;
	}

	return (
		<div className="flex min-h-screen flex-col">
			<h2 className="p-8">Friends</h2>
			<Separator />
			<div className="flex grow items-start gap-2">
				<DataTable
					className="flex-3 p-8"
					columns={columns}
					data={friends}
					onRowClick={(friend) => navigate({ to: `/friends/${friend.id}` })}
				/>
				<Separator orientation="vertical" />
				<Penguin className="flex-2 p-8">
					<Outlet />
				</Penguin>
			</div>
		</div>
	);
}
