import { Table, Row, Col, Tooltip } from "@nextui-org/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { DeleteIcon, IconButton, EditIcon } from "./svg/@dgl_svg";
import styles from "./component.module.css";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { updateFunctionExpression } from "typescript";

export default function TableDynamic({
  params,
  tableCols,
  tableRows,
  removeRow,
  editRow,
}: any) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const renderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "action":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user" color="primary">
                <IconButton onClick={() => editRow(item)}>
                  <EditIcon size={20} fill="#0072F5" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => removeRow(item.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return item[columnKey];
    }
  };

  return (
    <Table
      compact
      aria-label="Example table with dynamic content"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
    >
      <Table.Header columns={tableCols}>
        {(column: any) => (
          <Table.Column key={column.key}>{column.label}</Table.Column>
        )}
      </Table.Header>
      <Table.Body items={tableRows}>
        {(item: any) => (
          <Table.Row key={item.id}>
            {(columnKey) => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={5}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  );
}
