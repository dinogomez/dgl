import { Dropdown } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextPage } from "next";

interface Props {
  table: any;
}

const TableDropdown: NextPage<Props> = (props) => {
  const { table } = props;

  return (
    <Dropdown.Item key={table.table_name}>{table.table_name}</Dropdown.Item>
  );
};

export default TableDropdown;
