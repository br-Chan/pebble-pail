interface PenguinProps {
	children: React.ReactNode;
}

export function Penguin({ children }: PenguinProps) {
	return <div className="flex flex-1 flex-col gap-2">{children}</div>;
}
