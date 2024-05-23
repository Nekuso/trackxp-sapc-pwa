import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";

export const useServices: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [servicesData, setServicesData] = useState<any>([]);
  const getServices = async (props?: any) => {
    const result = await supabase
      .from("services")
      .select(
        `
        id,
        name,
        description,
        image_url,
        price,
        duration,
        status,
        inventory(
          id,
          branches(
              id,
              branch_name,
              branch_location,
              contact_number
          )
        ),
        created_at
    `
      )
      .order("created_at", { ascending: false });

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setServicesData(data);
  };

  return {
    // states
    servicesData,

    // methods
    getServices,
  };
};
