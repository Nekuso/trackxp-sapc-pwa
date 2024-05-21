"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type cartItem = {
  service_id: number;
  name: string;
  price: number;
  image_url: string;
  created_at: string;
  description: string;
  inventory_id: number;
  order_service_id: string;
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
              <p className="text-[.8rem] max-w-[200px] flex flex-wrap text-slate-50 font-bold">
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
          <div className="w-full flex justify-end">
            <div className="w-fit h-full flex place-items-center rounded-lg ">
              <div className="w-fut min-h-[30px] text-white flex place-items-center justify-end rounded-lg  text-right">
                <span>
                  ₱{" "}
                  {row.original.price
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
  ];
  return columns;
};
