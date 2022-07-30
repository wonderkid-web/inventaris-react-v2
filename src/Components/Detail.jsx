import { useState, useContext, useEffect } from 'react'
import { Paper, Button, Typography, Alert, Box } from '@mui/material'
import { useFetch } from '../Hooks/useHooks'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { collection, deleteDoc, doc, addDoc, getDocs } from 'firebase/firestore'
import { db } from '../Config/firebaseConfig'
import { useParams, Outlet, Link } from 'react-router-dom';

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

const DataTable = ({barang}) => {
    const [newRow, setNewRow] = useState()
    const columns = [
        // "dipakai":"mia","tanggal":"","namaBarang":"Monitor Dell","noBukti":"TT.0134","sisa":2,"keluar":2,"historyMasuk":["01/7/2022","03/7/2022"],"diterima":"fia","masuk":4,"id":"D6wx23Upmwq529Z4Txuz
        { field: 'id', headerName: 'ID', width: 210 },
        { field: 'noBukti', headerName: 'No Bukti', width: 130 },
        { field: 'diterima', headerName: 'Diterima', width: 130 },
        { field: 'dipakai', headerName: 'dipakai', width: 130 },
        { field: 'namaBarang', headerName: 'Nama Barang', width: 130 },
        { field: 'sisa', headerName: 'sisa', width: 130 },
    
    ];
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [selectedRow, setSelectedRow] = useState()
    const [close, setClose] = useState(false)
    const { data: rows } = useFetch('gudang')
    const singleRow = rows.filter(item => item.namaBarang === barang)
    console.log(rows)
    console.log(JSON.stringify(singleRow[0]))
    const test = singleRow[0]
    // useEffect(()=>{
    //     setNewRow(prev=>({
    //         ...prev,
    //         namaBarang: singleRow[0].namaBarang,
    //         id: singleRow[0].id,
    //         noBukti: singleRow[0].noBukti,
    //         diterima: singleRow[0].diterima,
    //         dipakai: singleRow[0].dipakai,
    //         sisa: singleRow[0].sisa,
    
    //     }))
    //     console.log(newRow)
    // }, [])
    const testt = {"namaBarang":"Monitor Dell","noBukti":"TT.0134","tanggal":"","diterima":"fia","masuk":4,"dipakai":"mia","historyMasuk":["01/7/2022","03/7/2022"],"keluar":2,"sisa":2,"id":"D6wx23Upmwq529Z4Txuz"}
    
    return (

        <div style={{ height: 400, width: '100%' }}>

            <DataGrid
                rows={rows[0]}
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
            {/* {deleteIcon ? <Delete row={selectedRow} /> : null}
			{deleteIcon ? <DetailProduct row={selectedRow} /> : null} */}
        </div>
    );
}


export const Detail = () =>{
  

    const {namaBarang} = useParams()
    return(
        <Box sx={{margin: 4}}>
            <h1>{namaBarang}</h1>
            <DataTable barang={namaBarang} />
        </Box>
    )
}