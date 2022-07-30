import { useState, useContext } from 'react'
import { Paper, Button, Typography, Alert, Box } from '@mui/material'
import { useFetch } from '../Hooks/useHooks'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { collection, deleteDoc, doc, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../Config/firebaseConfig'
import { useParams, Outlet, Link } from 'react-router-dom';

const columns = [
	// "dipakai":"mia","tanggal":"","namaBarang":"Monitor Dell","noBukti":"TT.0134","sisa":2,"keluar":2,"historyMasuk":["01/7/2022","03/7/2022"],"diterima":"fia","masuk":4,"id":"D6wx23Upmwq529Z4Txuz
    { field: 'id', headerName: 'ID', width: 210 },
    { field: 'namaBarang', headerName: 'Nama Barang', width: 130 },
    { field: 'sisa', headerName: 'sisa', width: 130 },

];

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

const DetailProduct = ({ row }) => {


    return (
        <Button variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />}
            sx={{ margin: 2 }}
		> 
            <Link to={`${row[0].namaBarang}`}>Detail produk </Link>
        </Button>
    )
}

const DataTable = () => {
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [selectedRow, setSelectedRow] = useState({})
    const [close, setClose] = useState(false)
    const { data: rows } = useFetch('gudang')
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
			{deleteIcon ? <DetailProduct row={selectedRow} /> : null}
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
export const Product = () =>{
	const {data:rows} = useFetch('gudang')
	const {namaBarang} = useParams()

	return(
		<Box>
			<Paper sx={{marginTop: 5, padding: 3}}>
				<Typography variant='h4'>Produk</Typography>
				<DataTable />	
			</Paper>
			<Paper>
					<Outlet />
			</Paper>
		</Box>
	
	)
}