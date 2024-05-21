import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";

export const useOrderServices: any = () => {
  const supabase = createSupabaseBrowserClient();

  const [orderServicesData, setOrderServicesData] = useState<any>([]);
  const [latestOrderServiceData, setLatestOrderServiceData] = useState<any>([]);
  const [currentOrderServiceData, setCurrentOrderServiceData] = useState<any>(
    []
  );
  const [currentOrderServiceDataTracking, setCurrentOrderServiceDataTracking] =
    useState<any>([]);

  const getOrderServicesLatest = async (props?: any) => {
    const result = await supabase
      .from("order_services")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        employee:employees!public_order_services_employee_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        supervisor:employees!order_services_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        tracking_id,
        rating,
        payment_method,
        created_at
    `
      )
      .eq("mobile_user_id", props.id)
      .order("created_at", { ascending: false })
      .limit(1);
    const { data, error } = result;
    if (error) {
      return error;
    }
    setLatestOrderServiceData(data);
    return result;
  };

  const getOrderServices = async (props: any, duration?: number) => {
    const { data, error } = await supabase
      .from("order_services")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        redeemed,
        redeem_code,
        remarks,
        employee:employees!public_order_services_employee_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        supervisor:employees!order_services_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_user:mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        tracking_id,
        rating,
        payment_method,
        created_at
        `
      )
      .eq("mobile_user_id", props.id)
      .order("created_at", { ascending: false });

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setOrderServicesData(data);
    return error;
  };

  const getOrderServiceTracking = async (props: any, duration?: number) => {
    const result = await supabase
      .from("order_services")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        remarks,
        employee:employees!public_order_services_employee_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        supervisor:employees!order_services_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        tracking_id,
        rating,
        payment_method,
        created_at
    `
      )
      .eq("id", props.id)
      .order("created_at", { ascending: false })
      .limit(1);

    const { data, error } = result;
    if (error) {
      return error;
    }
    setCurrentOrderServiceData(data);
    return result;
  };

  const updateOrderServiceRating = async (props: any, duration?: number) => {
    const result = await supabase
      .from("order_services")
      .update({
        rating: props.rating,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  return {
    // states
    orderServicesData,
    currentOrderServiceData,
    currentOrderServiceDataTracking,
    latestOrderServiceData,

    // methods
    getOrderServices,
    getOrderServiceTracking,
    getOrderServicesLatest,

    updateOrderServiceRating,
  };
};
