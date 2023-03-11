import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react"; 
import { createServerSupabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { Table, Text, Dropdown, Loading, Grid } from "@nextui-org/react"
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect, useMemo } from "react";

import Link from "next/link";
import TableDropdown from "../../components/@dgl_cmp_table_dropdown";
import React from "react";
import TableDynamic from "../../components/@dgl_cmp_table_dynamic";

export const revalidate = 0

export default function Menu() {
    //Supabase Database Handler
    const supabaseClient = useSupabaseClient();
    //User State from Supabase
    const user = useUser();

    
    const [dbtables, setDbTables] = useState<any[]>([]);
    const [tableCols, setTableCols] = useState<any[]>([]);
    const [tableRows, setTableRows] = useState<any[]>([]);        
    const [selected, setSelected] = useState<any>(new Set(['']));
    
    
    let selectedValue = useMemo(
      () => Array.from(selected).join("").replaceAll("_", " "),[selected]
    );



   
   
    
    useEffect(()=>{   
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
  
  
      
      
      //const {tableCols, tableRows} = props;
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
  
  
            setTableCols(columns);
            setTableRows(data);

          } else {
            getData();
          }
        
      }
    }

      if(typeof selectedValue !== "undefined") {
        getTables();
        getData();

    }
    
    },[selected]) 
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
          !selectedValue ? "Select Database" : selectedValue
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
      tableCols.length === 0 ? <Text></Text> : 
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
    user: session.user
    }
};
};