import { useParams, Link } from 'react-router-dom'
import { useFetch, useSingleFetch } from '../Hooks/useHooks'
import { useEffect, useState, useMemo } from 'react'
import { Button, Paper, Box, Stack, TextField, FormControl, MenuItem, Select } from '@mui/material'
import { GridToolbar, DataGrid, } from '@mui/x-data-grid'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {collection, addDoc, doc} from 'firebase/firestore'
import {db} from '../Config/firebaseConfig'

import { Delete } from './Button'

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


export const Product = () =>{
    const { namaBarang } = useParams()
    const { data: raw } = useFetch('akun')
    const { data: rows } = useFetch('gudang')
    const singleRow = rows.filter(row => row.namaBarang === namaBarang)



    const [row, setRow] = useState([
        {
            id: "",
            diterima: '',
            dipakai: '',
            noBukti: '',
            masuk: '',
            keluar: '',
            sisa: '',
            historyMasuk: ''
        }
    ])
    const rowMemo = useMemo(
      () => (row),
      [] //no dependencies so the value doesn't change
    );
    const [disabled, setDisabled] = useState(true)
    const [akun, setAkun] = useState({
        username: "",
        password: "",
        cpassword: "",
        role: ""

    })
    useEffect(() => {

        if (akun.password || akun.cpassword !== "") setDisabled(true)
        if (akun.password === akun.cpassword) setDisabled(false)

    }, [akun.password, akun.cpassword])

    const handleChange = (e) => {
        setAkun(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    const handleSubmit = (e) => {
       alert('test')
        // const colRef = collection(db, 'akun')
        // e.preventDefault()
        // const check = raw.find(item => item.username === akun.username)
        // if (check !== undefined) alert('akun gagal di tambah!')
        // else {

        //     addDoc(colRef, akun).then(res => alert('akun berhasil di tambah!'))
        // }
        // console.log(check)
        // console.log(checkAkun('')

    }
   
    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'namaBarang', headerName: 'Nama Barang', width: 210 },
        { field: 'diterima', headerName: 'Diterima oleh', width: 200 },
        { field: 'dipakai', headerName: 'Dipakai oleh', width: 200 },
        { field: 'noBukti', headerName: 'Nomor Bukti', width: 130 },
        // { field: 'masuk', headerName: 'Barang Masuk', width: 110 },
        // { field: 'keluar', headerName: 'Barang Keluar', width: 110, },
        { field: 'jumlah', headerName: 'jumlah', width: 110, },
        // { field: 'sisa', headerName: 'Sisa', width: 70, },
        { field: 'keterangan', headerName: 'Keterangan', width: 70, },
        { field: 'historyMasuk', headerName: 'History Barang Masuk', width: 130, },
        { field: 'historyKeluar', headerName: 'History Barang Keluar', width: 130, },


    ];
    // {
    //             id: 1,
    //             id: singleRow[0].id,
    //             diterima: singleRow[0].diterima,
    //             dipakai: singleRow[0].dipakai,
    //             noBukti: singleRow[0].noBukti,
    //             masuk: singleRow[0].masuk,
    //             keluar: singleRow[0].keluar,
    //             sisa: singleRow[0].sisa,
    //             historyMasuk: singleRow[0].historyMasuk[index]
    //         }
    // const singleRow = rows.filter(row => row.namaBarang === namaBaang)
     //console.log(singleRow[0].namaBarang) ==> "Monitor" 

    useEffect(()=>{
        if(singleRow.length>0){
             setRow(prev=>({
                ...prev,
                id: singleRow[0].id,
                diterima: singleRow[0].diterima,
                dipakai: singleRow[0].dipakai,
                noBukti: singleRow[0].noBukti,
                masuk: singleRow[0].masuk,
                keluar: singleRow[0].keluar,
                sisa: singleRow[0].sisa,
                // historyMasuk: singleRow[0].historyMasuk[0]
             }))
             console.log(row)
        }
    }, [rowMemo])
    console.log(row)
    // setRow(prev=>({
    //     ...prev,
    //     masuk: singleRow[0].masuk
    //     // Kenapa di bagian sini, singleRow[0] malah gak terdefine yah?
    // })
    return (
        <Paper sx={{ height: '100%', padding: 2, marginTop: 2 }}>
            <h1>Table {namaBarang}</h1>

            <DataTable columns={columns} rows={row} link={true} hapus={'gudang'} />
            <Box sx={{width: '100%'}}>
               <form onSubmit={()=>handleSubmit} >
               <FormControl>
                   <Stack direction="columns" >
                       <TextField type="email" variant="outlined" size="small" sx={{width: 1/4}} sx={{margin: '20px'}} label="diterima" />
                       <TextField type="email" variant="outlined" size="small" sx={{width: 1/4}} sx={{margin: '20px'}} label="dipakai" />
                       <TextField type="email" variant="outlined" size="small" sx={{width: 1/4}} sx={{margin: '20px'}} label="jumlah" />
                      <Select sx={{width:1/6, height: '50px' ,margin: '15px'}} defaultValue="">
                          <MenuItem value="masuk">Barang Masuk</MenuItem>
                          <MenuItem  value="keluar">Barang Keluar</MenuItem>
                      </Select>
                      <Button sx={{width: 1/4}} sx={{margin: '20px'}} size="small" variant="outlined">Tambah</Button>
                    </Stack>
               </FormControl>
                </form>
            </Box>
        </Paper>
    )
}