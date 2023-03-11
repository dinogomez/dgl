import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Table, Text, Dropdown, Loading, Grid, Spacer, Button, } from "@nextui-org/react"
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect, useMemo, useReducer } from "react";

import Link from "next/link";
import TableDropdown from "../../components/@dgl_cmp_table_dropdown";
import React from "react";
import TableDynamic from "../../components/@dgl_cmp_table_dynamic";
import ModalCellEdit from "../../components/@dgl_cmp_table_modal_cell_edit";


export default function Menu() {
    //Supabase Database Handler
    const supabaseClient = useSupabaseClient();
    //User State from Supabase
    const user = useUser();

    
    const [dbtables, setDbTables] = useState<any[]>([]);
    const [tableCols, setTableCols] = useState<any[]>([]);
    const [selectedRow, setSelectedRow] = useState<any>([]);
    const [tableRows, setTableRows] = useState<any[]>([]);        
    const [selected, setSelected] = useState<any>(new Set(['']));
    const [ignored, forceUpdate] = useReducer(x=> x+1, 0);
    const [visible, setVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const handler = (row:any) => {
      setVisible(true);
      setSelectedRow(row);
    }
    const closeHandler = () => {
      setVisible(false);
      console.log("closed");
    };

    const removeFromRows = (id:any) => {
      setTableRows((prevState) =>
      prevState.filter((prevItem) => prevItem !== id)
    );
      deleteRowFromTable(id)
    };

    const deleteRowFromTable = async (id:any) => {
      try{
        const { data, error} = await supabaseClient
          .from(selectedValue)
          .delete()
          .eq("id", id);
        if(error) throw error;
      }catch(error:any){
        alert(error.message);
      }
    }
    
    let selectedValue = useMemo(
      () => Array.from(selected).join("").replaceAll("_", " "),[selected]
    );


    const getData = async() => {
      if(selectedValue){
      let { data, error } = await supabaseClient.from(selectedValue).select("*");
      if(data != null && data != undefined){


        let columns:any = [];

        Object.keys(data[0]).forEach(element => {
          let data = {
            key: element,
            label: element.toUpperCase()
          }
          columns.push(data);
        });

        const action = {
          key: "action",
          label: "ACTION"
        }
    
        columns.push(action);

        setTableCols(columns);
        setTableRows(data);

      } else {
        getData();
      }
    
  }
}
const getTables = async() => {
  try{
    let { data, error } = await supabaseClient.rpc('gettables')
 
    if(data != null){
      setDbTables(data);
      if(selectedValue === undefined){
        selectedValue = data[0].table_name;
        setSelected(data[0].table_name)
      }
    }

  }catch(error: any){
    <Loading>Loading</Loading>
  }
}
   
    
    useEffect(()=>{   
      
      //const {tableCols, tableRows} = props;
      console.log(selectedRow);
      if(typeof selectedValue !== "undefined") {
        getTables();
        getData();

    }

      
    },[selected]) 

    useEffect(()=>{
      getData();
    },[tableRows])

  



    /*
        console.log(dbtables[0].table_name)
    console.log(tableRows)
    useEffect(()=>{
      changeTable();
    },[selectedValue]) 
    */





    return (
        
      <>
        
        <Text h2>Tables</Text>
        <Text size={"$lg"} css={{my: "$8"}}>Dynamic Tables fetched from cloud Postgres Database</Text>
        <hr />
        <br />
        <Dropdown>
        <Dropdown.Button  shadow color="secondary">        
        {
          !selectedValue ? "Select Table" : selectedValue
        }
        </Dropdown.Button>
        <Dropdown.Menu 
        aria-label="Dynamic Actions" 
        items={dbtables} color="secondary"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={setSelected}>
          {(dbtable: any) => (
            <Dropdown.Item
              key={dbtable.table_name}
            >
              {dbtable.table_name}
            </Dropdown.Item>
            
          )}
        </Dropdown.Menu>
    </Dropdown>


    <ModalCellEdit visible={visible} closeHandler={closeHandler} menu={selectedRow}/>
   
            
    {/*<TableDynamic columns={tableCols} rows={tableRows} />*/}
    {
      tableCols.length === 0 
      ? 
      <Text></Text>
      : 
      <TableDynamic 
        table={selectedValue} 
        tableCols={tableCols} 
        tableRows={tableRows} 
        removeRow={removeFromRows} 
        editRow={handler}/>
    }
      
    </>
    )
  }

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
// Create authenticated Supabase Client
const supabase = createServerSupabaseClient(ctx);
// Check if we have a session
const {
    data: { session }
    } = await supabase.auth.getSession();

if (!session)
    return {
    redirect: {
        destination: '/',
        permanent: false
    }
    };

return {
    props: {
    initialSession: session,
    user: session.user,
    },
};
};