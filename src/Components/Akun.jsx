import { useState, useContext } from 'react'
import { Paper, Button, Typography, Alert } from '@mui/material'
import { useFetch } from '../Hooks/useHooks'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { collection, deleteDoc, doc, addDoc } from 'firebase/firestore'
import { db } from '../Config/firebaseConfig'

const columns = [
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    {
        field: 'role',
        headerName: 'Role akun',
        width: 90,
    },

];

const addAkun = () => {
    const colRef = collection(db, 'akun')
    addDoc(colRef, {
        username: 'wahyu',
        password: 'wahyu',
        role: 'member'
    })
}
// addAkun()

const Delete = ({ row }) => {


    return (
        <Button variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}
            sx={{ margin: 2 }}
            onClick={() => {
                const docRef = doc(db, 'akun', row[0].id)
                deleteDoc(docRef)
            }}
        >
            Hapus
        </Button>
    )
}

function DataTable() {
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [close, setClose] = useState(false)
    const { data: rows } = useFetch('akun')
    return (

        <div style={{ height: 400, width: '100%' }}>

            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{
                    Toolbar: GridToolbar,
                }}
                checkboxSelection
                onSelectionModelChange={id => {
                    setDeleteIcon(!deleteIcon)
                    const selectedId = new Set(id)
                    setSelectedRow(rows.filter(row => selectedId.has(row.id)))

                }}
            />
            {deleteIcon ? <Delete row={selectedRow} /> : null}
        </div>
    );
}


export const Akun = () => {

    return (
        <Paper sx={{
            height: '90%',
            marginTop: 3,
            padding: 3
        }}>
            <Typography
                variant="h4"
                marginBottom={2}
            >
                Menejemen Akun
            </Typography >
            <Paper
                elevation={2}
                sx={{ width: '50%' }}>
                <DataTable />
            </Paper>
        </Paper >
    )
}