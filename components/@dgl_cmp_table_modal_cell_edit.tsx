import {
  Row,
  Modal,
  Input,
  Checkbox,
  Text,
  Button,
  Grid,
} from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { DeleteIcon, IconButton, EditIcon } from "./svg/@dgl_svg";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import InputGenerator from "./@dgl_cmp_field_input_generator";

export default function ModalCellEdit({
  closeHandler,
  visible,
  selectedRow,
  currentTable,
}: any) {
  const user = useUser();

  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [rowData, setRowData] = useState<any[]>([]);
  const [keys, setKeys] = useState<any[]>([]);
  const [values, setValues] = useState<any[]>([]);

  const updateInitialStateFromRow = () => {
    const initialState: any = {};
    keys.map((key: any, index) => {
      initialState[key] = values[index];
    });
    setRowData(initialState);
  };

  useEffect(() => {
    setKeys(Object.keys(selectedRow));
    setValues(Object.values(selectedRow));
    //console.log(typeof keys[0] + ":" + keys[0]);
  }, [selectedRow]);

  const handleChange = (e: any) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const updateRow = async () => {
    try {
      const { data, error } = await supabaseClient
        .from(currentTable)
        .update([rowData])
        .eq("id", values[0]);
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  const exclude = ["inserted_at", "updated_at", "created_at", "id"];

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text h3>Update Row</Text>
        <Grid xs={12}>
          <Text>Editing as {user?.email}</Text>
        </Grid>
      </Modal.Header>
      <Modal.Body>
        <>
          {keys.map((key: any, index) => {
            if (exclude.includes(key)) {
              return (
                <Input
                  labelLeft="Read Only"
                  readOnly
                  underlined
                  name={key}
                  label={key.toUpperCase()}
                  placeholder="Guillermo Rauch"
                  initialValue={values[index]}
                />
              );
            } else {
              return (
                <Input
                  shadow
                  clearable
                  name={key}
                  label={key.toUpperCase()}
                  placeholder="Guillermo Rauch"
                  onChange={handleChange}
                  initialValue={values[index]}
                />
              );
            }
          })}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={updateRow} color="success">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
