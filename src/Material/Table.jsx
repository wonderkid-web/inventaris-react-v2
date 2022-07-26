import { useState } from 'react'
import { collection, addDoc, doc } from 'firebase/firestore'
import {db} from '../Config/firebaseConfig'
import { Typography, Button, TextField } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar } from '@mui/x-data-grid';
import { useFetch } from '../Hooks/useHooks'

const columns = [
  { field: 'tanggal', headerName: 'Tanggal', width: 200 },
  { field: 'diterima', headerName: 'Diterima dari', width: 130 },
  { field: 'dipakai', headerName: 'Dipakai oelh', width: 130 },
  { field: 'noBukti', headerName: 'No. Bukti', width: 130 },
  { field: 'masuk', headerName: 'Barang Masuk', width: 130 },
  { field: 'keluar', headerName: 'Barang Keluar', width: 130 },
  { field: 'sisa', headerName: 'sisa', width: 130 },
];


export const Table = () => {
  const { data: row } = useFetch('stokBarang')

  return (
    <div style={{ width: '80vw', height:'400px', justifyContent:'center'}}>
      <DataGrid
        columns={columns}
        rows={row}
        pageSize={5}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: GridToolbar }}

      />
    </ div>
  );
}

