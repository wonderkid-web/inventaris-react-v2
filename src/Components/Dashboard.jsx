import { Grid, Paper, Box, Typography, stepButtonClasses } from '@mui/material'
import { useEffect, useState } from 'react';
import {useFetch} from '../Hooks/useHooks'
import {DashboardCard} from '../Material/Card'
import {BarChart} from './Chart'

export const Dashboard = () =>{
	const allMasuk =0;
	const {data:produk} = useFetch('gudang')
	const {data:akun} = useFetch('akun')
	
	const [number, setNumber] = useState({
		user: 0,
		masuk: 0,
		keluar: 0,
		produk: 0
	})

	

	const styles = {
		paperContainer: {
			background: `red`
		}
	};
	useEffect(()=>{
		produk.forEach(item=>{
			setNumber(prev=>({
				...prev,
				masuk: prev.masuk+=item.masuk,
				keluar: prev.keluar+=item.keluar,
				produk: produk.length
			}))
		})
	},[produk])
	
	useEffect(()=>{
		akun.forEach((item,index)=>{
			setNumber(prev=>({
				...prev,
				user: akun.length
			}))
		})
	}, [akun])
	return(
		<Box sx={{margin: 3}}>
			{/* <h1>SEKARANG KALIAN INI LAGI DI Dashboard </h1> */}
			<Box sx={{height: '50vh', }}>
				<Grid container spacing={2}>
					<Grid item xl={4.3} md={4.3} xs={12} >
						<img src="/dashboard.png" alt="" style={{width: '100%'}}/>
					</Grid>
					<Grid item xl={7.7} md={7.7} xs={12}>
						<Paper sx={{height: '98%', padding: '30px'}}>
							<Typography variant='h5'>Selamat Datang pada Dashboard Inventory PTPN IV</Typography>
							{/*<BarChart/>*/}
							
						</Paper>
					</Grid>
				</Grid>
			</Box>
			<Paper sx={{padding: 2}}>
				<Grid spacing="5"
				container
				direction="row"
				justifyContent="space-evenly"
				alignItems="center"
				>
					<Grid item>
						<DashboardCard title="Total Produk" number={number.produk} icon={4}/>
					</Grid>
					<Grid item >
						<DashboardCard title="Total barang Keluar" number={number.keluar} icon={2}/>
					</Grid>
					<Grid item>
						<DashboardCard title="Total barang Masuk" number={number.masuk} icon={3}/>
					</Grid>
					<Grid item>
						<DashboardCard title="Total Pengguna" number={number.user} icon={1}/>
					</Grid>
					
				</Grid>
			</Paper>
		</Box>
	)
}