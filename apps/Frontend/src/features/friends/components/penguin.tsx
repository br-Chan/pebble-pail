import { clsx } from "clsx";

interface PenguinProps {
	children: React.ReactNode;
	className?: string;
}

export function Penguin({ children, className }: PenguinProps) {
	return (
		<div className={clsx("flex flex-col gap-2", className)}>{children}</div>
	);
}
