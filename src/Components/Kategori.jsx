import {Link, Outlet} from 'react-router-dom'
import {Button, Typography, Box} from '@mui/material/'


export const Kategori = () =>{
	return(
		<>
			<Button type="outlined">
				<Typography variant="h2">
					<Link to="Atk" style={{textDecoration: 'none', color: 'white'}}>Atk</Link>
				</Typography>
			</Button>
			<Button>
				<Typography variant="h2">
					<Link to="Elektronik" style={{textDecoration: 'none', color: 'white'}}>Elektronik</Link>
				</Typography>
			</Button>

			<Box sx={{
				background: 'teal',
			}}>
				<Outlet />
			</Box>
			
		</>
	)
}