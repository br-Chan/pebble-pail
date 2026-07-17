import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/friends/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Welcome to the friends page!</div>;
}
