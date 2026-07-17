import { createFileRoute } from "@tanstack/react-router";
import { Penguin } from "#/features/friends/components/penguin";

export const Route = createFileRoute("/friends/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Penguin>Welcome to the friends page!</Penguin>;
}
