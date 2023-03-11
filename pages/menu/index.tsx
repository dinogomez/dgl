import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { createServerSupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Table, Text, Dropdown, Loading, Grid, Spacer } from "@nextui-org/react"
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect, useMemo, useReducer } from "react";

import Link from "next/link";
import TableDropdown from "../../components/@dgl_cmp_table_dropdown";
import React from "react";
import TableDynamic from "../../components/@dgl_cmp_table_dynamic";


export default function Menu() {
    //Supabase Database Handler
    const supabaseClient = useSupabaseClient();
    //User State from Supabase
    const user = useUser();

    
    const [dbtables, setDbTables] = useState<any[]>([]);
    const [tableCols, setTableCols] = useState<any[]>([]);
    const [tableRows, setTableRows] = useState<any[]>([]);        
    const [selected, setSelected] = useState<any>(new Set(['']));
    const [ignored, forceUpdate] = useReducer(x=> x+1, 0);

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
      
      if(typeof selectedValue !== "undefined") {
        getTables();
        getData();

    }

      
    },[selected]) 

    useEffect(()=>{
      getData();
    },[tableRows])

  
    console.log(dbtables)
    console.log(selectedValue);
    console.log(tableCols);
    console.log(tableRows);



    /*
        console.log(dbtables[0].table_name)
    console.log(tableRows)
    useEffect(()=>{
      changeTable();
    },[selectedValue]) 
    */

    /** DUMMY DATA 
    const columns = [
      {
        key: "name",
        label: "NAME",
      },
      {
        key: "role",
        label: "ROLE",
      },
      {
        key: "status",
        label: "STATUS",
      },
    ];
    const rows = [
      {
        key: "1",
        name: "Tony Reichert",
        role: "CEO",
        status: "Active",
      },
      {
        key: "2",
        name: "Zoey Lang",
        role: "Technical Lead",
        status: "Paused",
      },
      {
        key: "3",
        name: "Jane Fisher",
        role: "Senior Developer",
        status: "Active",
      },
      {
        key: "4",
        name: "William Howard",
        role: "Community Manager",
        status: "Vacation",
      },
    ];
*/



    return (
        
      <>
        
        <Text h2>Tables</Text>
        <Text size={"$lg"} css={{my: "$8"}}>Dynamic Tables fetched from cloud Postgres Database</Text>
        <hr />
        <br />
        <Dropdown>
        <Dropdown.Button  color="secondary">        
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
            
    {/*<TableDynamic columns={tableCols} rows={tableRows} />*/}
    {
      tableCols.length === 0 ? <Text></Text>: <TableDynamic table={selectedValue} tableCols={tableCols} tableRows={tableRows} removeRow={removeFromRows}/>
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