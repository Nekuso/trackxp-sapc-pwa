import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";

export const useMobileUsers: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [allMobileUserData, setAllMobileUserData] = useState<any>([]);
  const [currentMobileUserData, setCurrentMobileUserData] = useState<any>([]);

  const getMobileUsers = async () => {
    const result = await supabase.from("mobile_users").select(`
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,
        points,      
        created_at
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllMobileUserData(data);
  };

  const signInWithEmailAndPassword = async (props: any, duration?: number) => {
    const result = await supabase
      .from("mobile_users")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,
        points,      
        created_at
      `
      )
      .eq("email", props.email);
    if (result.error) return result;
    await new Promise((resolve) => setTimeout(resolve, duration));
    setCurrentMobileUserData(result.data);
    return result;
  };

  const signUpWithEmailAndPassword = async (props: any, duration?: number) => {
    const result = await supabase
      .from("mobile_users")
      .insert({
        first_name: props.first_name,
        last_name: props.last_name,
        email: props.email,
        password: props.password,
      })
      .select();
    if (result.error) return result;
    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  const getMobileUser = async (props: any, duration?: number) => {
    const { data, error } = await supabase
      .from("mobile_users")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,
        points,      
        created_at
      `
      )
      .eq("email", props.email);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentMobileUserData(data);
  };

  return {
    // states
    allMobileUserData,
    currentMobileUserData,

    // methods
    getMobileUser,
    getMobileUsers,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
  };
};
