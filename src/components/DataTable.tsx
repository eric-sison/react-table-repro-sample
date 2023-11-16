"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FunctionComponent } from "react";

export type DataTableProps = {
  data: Array<any>;
  columns: Array<ColumnDef<any, any>>;
};

export const DataTable: FunctionComponent<DataTableProps> = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((group) => {
              return (
                <tr key={group.id}>
                  {group.headers.map((header) => {
                    return (
                      <th key={header.id} scope="col">
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          {/* start of table body */}
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
