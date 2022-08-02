// import { Paper } from '@mui/material'
// import { Outlet, Link } from 'react-router-dom'
import { DataTable } from '../Components/Akun'
// import { useFetch } from '../Hooks/useHooks'

// export const ListProduct = () => {
// 	// const columns = [
// 	// 	{ field: 'id', headerName: 'ID', width: 50 },
// 	// 	{ field: 'tanggal', headerName: 'Tanggal', width: 210 },
// 	// 	{ field: 'diterima', headerName: 'Diterima oleh', width: 130 },
// 	// 	{ field: 'dipakai', headerName: 'Dipakai oleh', width: 130 },
// 	// 	{ field: 'noBukti', headerName: 'Nomor Bukti', width: 130 },
// 	// 	{ field: 'masuk', headerName: 'Barang Masuk', width: 110 },
// 	// 	{ field: 'keluar', headerName: 'Barang Keluar', width: 110, },
// 	// 	{ field: 'sisa', headerName: 'Sisa', width: 70, },

// 	// ];
// 	const columns = [
// 		// { field: 'id', headerName: 'ID', width: 50 },
// 		{ field: 'namaBarang', headerName: 'Nama Barang', width: 210 },
// 		{ field: 'diterima', headerName: 'Diterima oleh', width: 200 },
// 		{ field: 'dipakai', headerName: 'Dipakai oleh', width: 200 },
// 		// { field: 'noBukti', headerName: 'Nomor Bukti', width: 130 },
// 		// { field: 'masuk', headerName: 'Barang Masuk', width: 110 },
// 		// { field: 'keluar', headerName: 'Barang Keluar', width: 110, },
// 		{ field: 'sisa', headerName: 'Sisa', width: 70, },

// 	];
// 	const { data: rows } = useFetch('gudang')
// 	return (
// 		<>
// 			<h1>List Product</h1>
// 			<Paper sx={{ height: '100%' }}>
// 				<DataTable columns={columns} rows={rows} link={true} hapus='akun' />
// 			</Paper>
// 			<Outlet />
// 		</>
// 	)
// }

import { useState, useContext } from 'react'
import { Paper, Button, Typography, Alert, Grid, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material'
import { useFetch } from '../Hooks/useHooks'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import { Delete } from './Button'
import {db} from '../Config/firebaseConfig'
import {collection, getDocs, doc, addDoc, updateDoc} from 'firebase/firestore'

 const columns = [
  // { field: 'id', headerName: 'ID', width: 50 },
  { field: 'historyMasuk', headerName: 'History', width: 210 },
  { field: 'diterima', headerName: 'Diterima oleh', width: 130 },
  { field: 'dipakai', headerName: 'Dipakai oleh', width: 130 },
  { field: 'noBukti', headerName: 'Nomor Bukti', width: 130 },
  { field: 'masuk', headerName: 'Barang Masuk', width: 110 },
  { field: 'keluar', headerName: 'Barang Keluar', width: 110, },
]

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

// export function DataTable({ columns, rows, hapus, link }) {
//     const [deleteIcon, setDeleteIcon] = useState(false)
//     const [buttonLink, setButtonLink] = useState(false)
//     const [selectedRow, setSelectedRow] = useState({})
//     const [close, setClose] = useState(false)
//     return (

//         <div style={{ height: 400, width: '100%' }}>

//             <DataGrid
//                 columns={columns}
//                 rows={rows}
//                 pageSize={5}
//                 rowsPerPageOptions={[5]}
//                 components={{
//                     Toolbar: GridToolbar,
//                 }}
//                 checkboxSelection
//                 onSelectionModelChange={id => {
//                     setDeleteIcon(!deleteIcon)
//                     setButtonLink(!buttonLink)
//                     const selectedId = new Set(id)
//                     setSelectedRow(rows.filter(row => selectedId.has(row.id)))
//                     // console.log(JSON.stringify(selectedRow[0].username))

//                 }}
//             />
//             {deleteIcon ? <Delete row={selectedRow} coll={hapus} /> : null}
//             {link ? buttonLink ? <DetailLink row={selectedRow[0].namaBarang} /> : null : null}
//         </div>
//     );
// }


export const ListProduct = () => {
    const { data: rows } = useFetch('gudang')
    const [namaBarang, setNamaBarang] = useState("")
    const [labelBarang, setLabelBarang] = useState('');
    const [historyMasuk, setHistoryMasuk] = useState({})
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        namaBarang: "",
        tanggal: "",
        diterima: "",
        dipakai: "",
        noBukti: "",
        masuk: "",
        keluar: "",
        sisa: "",
        historyMasuk: []
    })
    const [tableRow, setTableRow] = useState()
    let box = []

    const handleSubmit = (e) =>{
        box = []
    	e.preventDefault()
        // console.log(rows)
        const filtered = rows.filter(row=>row.namaBarang==form.namaBarang)
        filtered[0].historyMasuk.map((history, index)=>{
            const totalMasuk = filtered[0].masuk.reduce((acc, cur) => acc + cur)
            const totalKeluar = filtered[0].keluar.reduce((acc, cur) => acc + cur)
            const total = totalMasuk - totalKeluar
            box.push({
                ...filtered[0],
                 historyMasuk: history,
                id: index, masuk: filtered[0].masuk[index],
                keluar: filtered[0].keluar[index],
                sisa: total
            })
        })
        setTableRow(box)
        console.log(tableRow)
        setLoading(!loading)

    }

    const handleChangeForm = (e) =>{
        setForm(prev=>({
            ...prev,
            [e.target.name] : [e.target.value]
        }))

    }



    return (
        <Paper sx={{
            marginTop: 3,
            padding: 3,
            paddingBottom: 9
        }}>
            <Typography
                variant="h4"
                marginBottom={2}
            >
                Menejemen Data Barang
            </Typography >
            <Grid container padding={1}>
            	<Grid container   sx={{border: 'solid'}}>
                <Grid item md={1} xs={12}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="label">Nama Barang</InputLabel>
                    <Select
                      labelId="label"
                      id="label"
                      name="namaBarang"
                      defaultValue=""
                      value={form.namaBarang}
                      label="Label Barang"
                      onChange={(e)=>setForm(prev=>({...prev, namaBarang: e.target.value}))}
                    >
                    {
                        rows.map(item=>{
                            return(
                              <MenuItem key={item.id} value={item.namaBarang}>{item.namaBarang}</MenuItem>
                            )
                        })
                    }
                     {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>*/}
                    </Select>
                  </FormControl>
                </Grid>
                 <Grid item md={12} xs={12}> 
                  {tableRow[0].sisa}
                    <form onSubmit= {handleSubmit} id="namaBarang">
                        <Paper
                            elevation={2}
                            sx={{ width: 1 , height: .5, padding: 1,}}>
                            <Grid container>
                                <Grid item md={3}>
                                    <TextField type="date"  name="tanggal"  onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>
                              {/*  <Grid item>
                                    <TextField type="text"  name="diterima" label="Diterima Oleh " onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>*/}
                                <Grid item>
                                    <TextField type="text"  name="dipakai" label="Dipakai Oleh" onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>
                                <Grid item>
                                    <TextField type="text"  name="noBukti" label="Nomor Bukti" onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>
                                <Grid item>
                                    <TextField type="number"  name="masuk" label="Barang Masuk" onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>
                               {/* <Grid item>
                                    <TextField type="number"  name="keluar" label="Barang Keluar" onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>
                                <Grid item>
                                    <TextField type="number"  name="sisa" label="Sisa" onChange={handleChangeForm} size="small" sx={{width: .9, marginTop: 1}}/>
                                </Grid>*/}
                            </Grid>
                            <Button variant="contained" sx={{marginTop: 2.5}} type="submit" form="namaBarang">Tambah Barang</Button>
                        </Paper>
                    </form>
                 </Grid>   
                </Grid>
            </Grid>
            <Grid container>
            </Grid>
            <Paper>
            {loading &&  <DataTable columns={columns} rows={tableRow} link={true} hapus='akun' />}

            </Paper>
        </Paper >
    )
}
    // <Paper
    //                     elevation={2}
    //                     sx={{ width: 1 }}>
    //                     <DataTable columns={columns} rows={rows} hapus='akun' />
    //                 </Paper>