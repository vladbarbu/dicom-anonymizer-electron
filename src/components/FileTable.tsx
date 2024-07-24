"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { getDicomTags, anonymizeDicom } from "./dicom/main";

import { FileDetailsModal } from "./FileDetailsModal";
import { set } from "zod";

export type FileDict = {
    id: number;
    status: "not anonymized" | "anonymized 🛡️" | "Loading";
    root_path: string;
    file_name: string;
};

export const getColumns = (
    selectedFiles: FileDict[],
    handleDeleteRow: (id: number) => void,
    handleShowDetailsModal: (root_path: string, file_path: string) => void
) => {
    const columns: ColumnDef<FileDict>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
        },
        {
            accessorKey: "root_path",
            header: "Root path",
            cell: ({ row }) => <div>{row.getValue("root_path")}</div>,
        },
        {
            accessorKey: "file_name",
            header: ({ column }) => {
                return (
                    <div className="flex justify-end">
                        <Button
                            className="text-right"
                            variant="ghost"
                            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        >
                            File name
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                );
            },
            cell: ({ row }) => (
                <div className="text-right lowercase">{row.getValue("file_name")}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleDeleteRow(row.original.id)}>
                                Remove file
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    handleShowDetailsModal(
                                        row.original.root_path,
                                        row.original.file_name
                                    )
                                }
                            >
                                Show file details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return columns;
};

export function FileTable({
    selectedFiles,
    handleDeleteRow,
    pageIndex,
    handlePageChange,
}: {
    selectedFiles: any;
    handleDeleteRow: (id: number) => void;
    pageIndex: number;
    handlePageChange: (pageIndex: number) => void;
}) {
    const [dicomTags, setDicomTags] = useState({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [data, setData] = useState<FileDict[]>(selectedFiles);

    async function handleShowDetailsModal(root_path: string, file_name: string) {
        const results = await getDicomTags(root_path, file_name);
        setDicomTags(results);
    }

    function handleOnCLoseModal() {
        setDicomTags({});
    }

    async function handleAnonymize() {
        const updatedData = data.map((file) => {
            if (
                table
                    .getFilteredSelectedRowModel()
                    .rows.some(
                        (row) => row.original.id === file.id && file.status !== "anonymized 🛡️"
                    )
            ) {
                return {
                    ...file,
                    status: "Loading" as const,
                };
            }
            return file;
        });

        setData(updatedData);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        const selectedPath = await window.electron.openDirectoryPicker();

        for (let i = 0; i < updatedData.length; i++) {
            const file = updatedData[i];
            if (file.status === "Loading") {
                const updatedFile = {
                    ...file,
                    status: "anonymized 🛡️" as const,
                };

                await anonymizeDicom(file.root_path, file.file_name, selectedPath);

                const newData = [
                    ...updatedData.slice(0, i),
                    updatedFile,
                    ...updatedData.slice(i + 1),
                ];

                setData(newData);
                updatedData[i] = updatedFile;
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    }

    const columns = getColumns(
        data,
        (id: number) => {
            setData((prevData) => prevData.filter((file) => file.id !== id));
            handleDeleteRow(id);
        },
        handleShowDetailsModal
    );

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: {
                pageIndex,
                pageSize: 10,
            },
        },
        onPaginationChange: (updater) => {
            const newState =
                typeof updater === "function" ? updater(table.getState().pagination) : updater;

            if (newState.pageIndex === 0 && table.getState().pagination.pageIndex === 1) {
                handlePageChange(newState.pageIndex);
            }

            if (newState.pageIndex === 0 && table.getState().pagination.pageIndex > 1) {
                if (table.getState().pagination.pageIndex + 1 > table.getPageCount()) {
                    handlePageChange(table.getPageCount() - 1);
                } else {
                    handlePageChange(table.getState().pagination.pageIndex);
                }
            } else {
                handlePageChange(newState.pageIndex);
            }
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter files..."
                    value={(table.getColumn("file_name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("file_name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <Button variant="outline" size="sm" onClick={() => handleAnonymize()}>
                    Anonymize the selected files
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
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
                                                      header.getContext()
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
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>

                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <span className="text-sm">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
            {Object.keys(dicomTags).length > 0 && (
                <FileDetailsModal dicomTags={dicomTags} handleOnCLoseModal={handleOnCLoseModal} />
            )}
        </div>
    );
}
