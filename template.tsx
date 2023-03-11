import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { useRouter } from "next/router";
import Link from "next/link";
export default function Login() {
    //Supabase Database Handler
    const supabaseClient = useSupabaseClient();
    //User State from Supabase
    const user = useUser();
    //Next Router
    const router = useRouter();
    return (
        
      <>
      
      </>
    )
  }
  