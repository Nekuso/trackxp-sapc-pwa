"use client";
import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type cartItem = {
  part_id: number;
  name: string;
  description: string;
  image_url: string;
  quantity: number;
  price: number;
  barcode: string;
  brand: string;
  status: string;
  created_at: string;
  uoms: any;
  inventory: any;
};

export const initiateColumns = () => {
  const columns: ColumnDef<cartItem>[] = [
    {
      id: "name",
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        return (
          <div className="flex place-items-between justify-center gap-4">
            <div className="flex flex-col justify-start 2xl:py-2">
              <p className="text-[.8rem] max-w-[100px] flex flex-wrap text-slate-50 font-bold">
                {row.original.name}
              </p>{" "}
            </div>
          </div>
        );
      },
    },
    {
      id: "price",
      header: () => {
        return <div className="w-full text-end">Price</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-4 justify-end place-items-center">
            <p className="text-xs text-white font-regular">
              ₱{" "}
              {row.original.price
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              {`x ${row.original.quantity}`}
            </p>
          </div>
        );
      },
    },
    {
      id: "total",
      header: () => {
        return <div className="w-full text-end">Total</div>;
      },
      cell: ({ row }) => {
        return (
          <div className="w-full flex gap-4 justify-end place-items-center">
            <p className="text-xs text-white font-regular">
              {`₱ ${(row.original.quantity * row.original.price)
                .toFixed(2)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            </p>
          </div>
        );
      },
    },
  ];
  return columns;
};
