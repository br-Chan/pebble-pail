"use client";

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	noop,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Input } from "#/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
	className?: string;
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	onRowClick?: (rowData: TData) => void;
}

export function DataTable<TData, TValue>({
	className,
	columns,
	data,
	onRowClick = noop,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div className={className}>
			<div className="flex items-center pb-4">
				<Input
					className="max-w-sm"
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					placeholder="Search friends..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
				/>
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									className="cursor-pointer"
									data-state={row.getIsSelected() && "selected"}
									key={row.id}
									onClick={() => onRowClick(row.original)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											onRowClick(row.original);
										}
									}}
									role="link"
									tabIndex={0}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
