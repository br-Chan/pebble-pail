import type { ColumnDef } from "@tanstack/react-table";
import type { Friend } from "../types";

export const columns: ColumnDef<Friend>[] = [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
];
