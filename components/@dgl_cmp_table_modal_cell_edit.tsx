import { Row, Modal, Input, Checkbox, Text, Button } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { DeleteIcon, IconButton, EditIcon } from "./svg/@dgl_svg"
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import InputGenerator from "./@dgl_cmp_field_input_generator";



export default function ModalCellEdit({closeHandler,visible, menu}:any) {
    

    const [supabaseClient] = useState(() => createBrowserSupabaseClient());
    const [keys, setKeys ] = useState<any[]>([]);
    const [values, setValues] = useState<any[]>([]);


    useEffect(()=>{

      setKeys(Object.keys(menu));
      setValues(Object.values(menu));

    },[menu])

    
    const exclude = ['inserted_at', 'updated_at', 'created_at', 'id'];

  

    return(
      <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text h3>Update Row</Text>
      </Modal.Header>
      <Modal.Body>
      <>
      {
        
        keys.map((key:any,index)=>{
          if(exclude.includes(key)){
            return(<Input labelLeft="Read Only" readOnly underlined label={key.toUpperCase()} placeholder="Guillermo Rauch" initialValue={values[index]}/>)
          } else {
            return(<Input shadow  clearable label={key.toUpperCase()} placeholder="Guillermo Rauch" initialValue={values[index]}/>) 
          }
        })
        
      }
      

      </>
      </Modal.Body>
      <Modal.Footer>
      
        <Button auto onPress={closeHandler} color="success">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
        
        
    )
}


