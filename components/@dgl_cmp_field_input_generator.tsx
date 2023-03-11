import { Row, Modal, Input, Checkbox, Text, Button } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { DeleteIcon, IconButton, EditIcon } from "./svg/@dgl_svg"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";



export default function InputGenerator({tableCols}:any) {
    

    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
    
   

    return(
      <>
      {
        tableCols.map((col:any)=>{
            <>
            <label >{col.label}</label>
            <input type="text" id="fname" name="fname"/>
            </>
        })
      }
      
      </>     
        
    )
}


