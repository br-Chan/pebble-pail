import type { Friend } from "../types";

interface PenguinInformationProps {
	friend: Friend;
}

export function PenguinInformation({ friend }: PenguinInformationProps) {
	return (
		<div>
			<h3>
				{friend.firstName} {friend.surname}
			</h3>
			<p>{friend.firstName} is very cool!</p>
		</div>
	);
}
