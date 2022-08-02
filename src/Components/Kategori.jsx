import { useState, useContext } from 'react'
import { Paper, Button, Typography, Alert, Grid, TextField } from '@mui/material'
import { useFetch } from '../Hooks/useHooks'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { Delete } from './Button'
import {db} from '../Config/firebaseConfig'
import {collection, getDocs, doc, addDoc} from 'firebase/firestore'

const columns = [
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 130 },
    // { field: 'password', headerName: 'Password', width: 130 },
    // { field: 'role', headerName: 'Role akun', width: 90, }

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


export const Kategori = () => {
    const { data: rows } = useFetch('gudang')
    const [namaBarang, setNamaBarang] = useState("")

    const handleSubmit = (e) =>{
    	e.preventDefault()
    	const colRef = collection(db, 'gudang')
    	addDoc(colRef, {
    		namaBarang
    	})
    	.then(res=>{
    		alert('data berhasil di tambah')
    		setNamaBarang('')
    	})
    }

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
               Katalog Nama Barang
            </Typography >
            <Grid container spacing={5} sx={{textAlign: 'center'}} >
            	<Grid item md={6} xs={12}> 
            		<form onSubmit=	{handleSubmit} id="namaBarang">
			            <Paper
			                elevation={2}
			                sx={{ width: 1 , height: .5, padding: 1,}}>
						<Typography variant="h6">Tambah Jenis Barang</Typography>
						<TextField value={namaBarang} label="Nama Barang" onChange={e=>setNamaBarang(e.target.value)} size="small" sx={{width: .9, marginTop: 1}}/>
						<Button variant="contained" sx={{marginTop: 2.5}} type="submit" form="namaBarang">Tambah Barang</Button>
			            </Paper>
            		</form>
            	</Grid>
            	<Grid item md={6} xs={12}> 
		            <Paper
		                elevation={2}
		                sx={{ width: 1 }}>
		                <DataTable columns={columns} rows={rows} hapus='akun' />
		            </Paper>
            	</Grid>
            	
            </Grid>
        </Paper >
    )
}