import React from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { BulkUpdateProducts, DeleteProduct } from "../api";

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme();

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        actions={actions}
        editable={{
          onBulkUpdate: changes =>
            new Promise((resolve, reject) => {
              const updates = Object.keys(changes).map(key => ({
                productId: changes[key].newData.productId,
                ...changes[key].newData
              }));
              
              BulkUpdateProducts(updates)
                .then(() => resolve())
                .catch((error) => reject(error));
            }),     
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              DeleteProduct(oldData.productId)
                .then(() => resolve())
                .catch((error) => reject(error));
            }),     
        }}
        
      />
    </ThemeProvider>
  );
};

export default DataTable;
