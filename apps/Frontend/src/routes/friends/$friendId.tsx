import { createFileRoute } from "@tanstack/react-router";
import { Penguin } from "#/features/friends/components/penguin";

export const Route = createFileRoute("/friends/$friendId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { friendId } = Route.useParams();
	return (
		<Penguin>
			<div>Hello "/friends/{friendId}"!</div>
		</Penguin>
	);
}
