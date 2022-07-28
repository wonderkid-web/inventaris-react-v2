import { Paper, Button, TextField, Box, Stack, Table, Typography, Select, FormControl, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFetch } from '../Hooks/useHooks'
import { db } from '../Config/firebaseConfig'
import { doc, collection, addDoc } from 'firebase/firestore'

export const TambahAkun = () => {
    const { data: raw } = useFetch('akun')
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
        const colRef = collection(db, 'akun')
        e.preventDefault()
        const check = raw.find(item => item.username === akun.username)
        if (check !== undefined) alert('akun gagal di tambah!')
        else {

            addDoc(colRef, akun).then(res => alert('akun berhasil di tambah!'))
        }
        // console.log(check)
        // console.log(checkAkun(''))



    }
    return (
        <Paper
            sx={{
                height: '95%',
                marginTop: 3,
                padding: 3
            }}
        >
            <Typography variant="h5">
                Kelola akun baru PTPN IV
            </Typography>
            <Paper elevation={2} sx={{
                margin: 1,
                width: '30%',
                padding: 3
            }}>
                <Stack spacing={2}>
                    <form onSubmit={handleSubmit}>

                        <FormControl required fullWidth >
                            <TextField
                                type="username"
                                label="Username"
                                variant="standard"
                                size="small"
                                name="username"
                                onChange={handleChange}
                                required />
                            <TextField
                                type="password"
                                name="password"
                                label="Password"
                                variant="standard"
                                size="small"
                                onChange={handleChange}
                                required />
                            <TextField
                                name="cpassword"
                                type="password"
                                label="Confirm password"
                                variant="standard"
                                size="small"
                                onChange={handleChange}
                                required
                            />
                            <Box sx={{ margin: 2, color: 'black', width: '100%' }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Role Akun"
                                    onChange={handleChange}
                                    color="primary"
                                    defaultValue=""
                                    name="role"
                                    required
                                >
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                    <MenuItem value={'member'}>Member</MenuItem>
                                </Select>
                            </Box>
                            <Button variant="contained" type="submit" disabled={disabled}>Daftar</Button>
                        </FormControl>
                    </form>
                </Stack>
            </Paper>

        </Paper>
    )
}