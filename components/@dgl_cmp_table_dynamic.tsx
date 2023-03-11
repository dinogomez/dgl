import { Table} from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { NextPage } from "next";
import styles from "./component.module.css"

interface Props{
    tableCols: any
    tableRows: any
}

const TableDynamic: NextPage<Props> = (props) => {
    
    const {tableCols, tableRows} = props;

   

    return(
        <Table
        compact
        aria-label="Example table with dynamic content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header columns={tableCols}>
          {(column:any) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={tableRows}>
          {(item: any) => (
            <Table.Row key={item.id}>
              {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
        
        
    )
}


export default TableDynamic;