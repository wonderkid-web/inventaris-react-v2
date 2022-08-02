import { useState, useContext } from 'react'
import { Paper, Button, Typography, Alert } from '@mui/material'
import { useFetch } from '../Hooks/useHooks'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { Delete } from './Button'

const columns = [
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'username', headerName: 'Username', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    { field: 'role', headerName: 'Role akun', width: 90, }

];



export const DetailLink = ({ row }) => {

    return (
        <Button variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}
            sx={{ margin: 2 }}
        // onClick={() => {

        // }}
        >
            <Link to={`/list-produk/${row}`}>Detail Product</Link>
        </Button>
    )
}

export function DataTable({ columns, rows, hapus, link }) {
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [buttonLink, setButtonLink] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [close, setClose] = useState(false)
    return (

        <div style={{ height: 400, width: '100%' }}>

            <DataGrid
                columns={columns}
                rows={rows}
                pageSize={5}
                rowsPerPageOptions={[5]}
                components={{
                    Toolbar: GridToolbar,
                }}
                checkboxSelection
                onSelectionModelChange={id => {
                    setDeleteIcon(!deleteIcon)
                    setButtonLink(!buttonLink)
                    const selectedId = new Set(id)
                    setSelectedRow(rows.filter(row => selectedId.has(row.id)))
                    // console.log(JSON.stringify(selectedRow[0].username))

                }}
            />
            {deleteIcon ? <Delete row={selectedRow} coll={hapus} /> : null}
            {link ? buttonLink ? <DetailLink row={selectedRow[0].namaBarang} /> : null : null}
        </div>
    );
}


export const Akun = () => {
    const { data: rows } = useFetch('akun')

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
                <DataTable columns={columns} rows={rows} hapus='akun' />
            </Paper>
        </Paper >
    )
}