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
    console.log(result.data);
    if (error) {
      return error;
    }
    setLatestOrderServiceData(data);
    return result;
  };

  const getOrderService = async (id: string, duration?: number) => {
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
      .eq("id", id)
      .order("created_at", { ascending: false });

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setCurrentOrderServiceData(data);
    return error;
  };
  const getOrderServiceTracking = async (id: string, duration?: number) => {
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
      .eq("tracking_id", id)
      .order("created_at", { ascending: false });

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setCurrentOrderServiceDataTracking(data);
    return error;
  };
  const updateOrderService = async (props: any, duration?: number) => {
    const result = await supabase
      .from("order_services")
      .update({
        subtotal: props.subtotal,
        total_price: props.total_price,
      })
      .eq("id", props.id);

    const productResult = await supabase
      .from("purchase_products")
      .insert(
        props.purchase_products.map((product: any) => ({
          order_service_id: props.id,
          product_id: product.product_id,
          name: product.name,
          description: product.description,
          inventory_id: product.inventory_id,
          image_url: product.image,
          barcode: product.barcode,
          price: product.price,
          quantity: product.quantity,
          uom_name: product.uom_name,
        }))
      )
      .select();

    const partResult = await supabase
      .from("purchase_parts")
      .insert(
        props.purchase_parts.map((part: any) => ({
          order_service_id: props.id,
          part_id: part.part_id,
          name: part.name,
          description: part.description,
          inventory_id: part.inventory_id,
          image_url: part.image,
          barcode: part.barcode,
          price: part.price,
          quantity: part.quantity,
          brand: part.brand_name,
        }))
      )
      .select();
    const serviceResult = await supabase
      .from("purchase_services")
      .insert(
        props.purchase_services.map((service: any) => ({
          order_service_id: props.id,
          service_id: service.id,
          name: service.name,
          description: service.description,
          inventory_id: service.inventory_id,
          price: service.price,
          image_url: service.image,
        }))
      )
      .select();

    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };
  const updateOrderServicePrice = async (props: any, duration?: number) => {
    const result = await supabase
      .from("order_services")
      .update({
        subtotal: props.subtotal,
        total_price: props.total_price,
      })
      .eq("id", props.id);

    const serviceResult = await supabase
      .from("purchase_services")
      .update({
        price: props.price,
      })
      .eq("id", props.service_id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return JSON.stringify(result);
  };
  const updateOrderServicePayment = async (props: any, duration?: number) => {
    const result = await supabase
      .from("order_services")
      .update({
        amount_paid: props.amount_paid,
        payment_method: props.payment_method,
        status: "Paid",
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };
  const updateOrderServiceRemarks = async (props: any, duration?: number) => {
    const result = await supabase
      .from("order_services")
      .update({
        remarks: props.remarks,
      })
      .eq("id", props.id);

    await new Promise((resolve) => setTimeout(resolve, duration));

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
  const deleteOrderService = async (props: any, duration: number = 2000) => {
    const result = await supabase.from("orders").delete().eq("id", props.id);

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
    getOrderService,
    getOrderServiceTracking,
    getOrderServicesLatest,
    updateOrderService,
    updateOrderServicePrice,
    updateOrderServicePayment,
    updateOrderServiceRemarks,
    updateOrderServiceRating,
    deleteOrderService,
  };
};
