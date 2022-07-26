import {Typography, Box, Button, TextField, Avatar, Stack, Paper} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import { useRef, useState, useEffect, useContext } from "react";
import { useFetch } from '../Hooks/useHooks'
import {LoginContext, RolesContext} from '../Hooks/useHooks'


export const Login = () =>{
	document.body.style.background= '#1976d2'
	const { data: raw} = useFetch('akun')
	const [akun, setAkun] = useState({
		username: "",
		password: ""
	})
	const {logged, setLogged} = useContext(LoginContext)
	const {role, setRole} = useContext(RolesContext)
	// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
	// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
	// const REGISTER_URL = '/register';

 //    const userRef = useRef();
 //    const errRef = useRef();

 //    const [user, setUser] = useState('');
 //    const [validName, setValidName] = useState(false);
 //    const [userFocus, setUserFocus] = useState(false);

 //    const [pwd, setPwd] = useState('');
 //    const [validPwd, setValidPwd] = useState(false);
 //    const [pwdFocus, setPwdFocus] = useState(false);

 //    const [matchPwd, setMatchPwd] = useState('');
 //    const [validMatch, setValidMatch] = useState(false);
 //    const [matchFocus, setMatchFocus] = useState(false);

 //    const [errMsg, setErrMsg] = useState('');
 //    const [success, setSuccess] = useState(false);

 //    useEffect(() => {
 //        userRef.current.focus();
 //    }, [])

 //    useEffect(() => {
 //        setValidName(USER_REGEX.test(user));
 //    }, [user])

 //    useEffect(() => {
 //        setValidPwd(PWD_REGEX.test(pwd));
 //        setValidMatch(pwd === matchPwd);
 //    }, [pwd, matchPwd])

 //    useEffect(() => {
 //        setErrMsg('');
 //    }, [user, pwd, matchPwd])

 //    const handleSubmit = async (e) => {
 //        e.preventDefault();
 //        // if button enabled with JS hack
 //        const v1 = USER_REGEX.test(user);
 //        const v2 = PWD_REGEX.test(pwd);
 //        if (!v1 || !v2) {
 //            setErrMsg("Invalid Entry");
 //            return;
 //        }
 //    }
	const path = useNavigate()
	const changePath = ()=>{
		path('/')
		setLogged(true)
	}
	const handleChange = (e) =>{
		setAkun(prev=>({
			...prev,
			[e.target.name] : e.target.value
		}))
	}
	const checkAuth = () =>{
		raw.forEach((item, index)=>{
			if(item.username === akun.username && item.password === akun.password){
				if( Object.values(raw[index]).includes("admin")){
					setRole('admin')
				}else if( Object.values(raw[index]).includes("member")){
					setRole('member')
				}
				changePath()
			}
		})
		// console.log(akun.username)
	}
	return(
		<Paper elevation={10} 
		sx={{
			width: "fit-content",
			p: 3,
			px: 5,
			margin: 'auto',
			marginTop: '20vh'
		}}
		position="center"
		>
			<Stack 
				direction="column"
				spacing={2}
				alignItems="center"
			>
				<Avatar 
					alt="Profile User" 
					src="https://www.ptpn4.co.id/wp-content/uploads/2017/02/Logo_PTPN4.png" 
					size="large" 
					sx={{
						width: "56px",
						height: "56px"
					}}
					variant="square"	
				/>
				<Typography variant="p"> 
					Form Login PTPN IV
				</Typography>
				<TextField required label="Username" type="outlined" size="small" name="username" onChange={handleChange}  autoComplete="off" />
				<TextField required label="Password" type="password" size="small" name="password" onChange={handleChange}  autoComplete="off" />
				<Stack direction="row" spacing={2}>
					<Button variant="outlined" size="small" onClick={checkAuth}>Sign in</Button>
					<Button variant="outlined" size="small" onClick={changePath}>Sign up</Button>
				</Stack>
				<Button variant="outlined" size="small" startIcon={<GoogleIcon />}>Sign in with google</Button>
			</Stack>
		</Paper>
	)
}