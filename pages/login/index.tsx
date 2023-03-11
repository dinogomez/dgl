import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { useRouter } from "next/router"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from "@supabase/auth-ui-shared"
import Link from "next/link";
export default function Login() {
    //Supabase Database Handler
    const supabaseClient = useSupabaseClient();
    //User State from Supabase
    const user = useUser();
    //Next Router
    const router = useRouter();
    if(user){
      //Redirect if Logged In
      router.push("/");
    }
    return (
        
      <>
        <Auth 
           appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#F5A524',
                  brandAccent: '#F9CB80',
                },
              },
            },
          }}
           supabaseClient={supabaseClient}
           providers={[]}
        />
      </>
    )
  }
  