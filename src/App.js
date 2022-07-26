// import './App.css';
import {useState} from 'react'
import {MiniDrawer} from './Material/MiniDrawer'
import {Routes, Route} from 'react-router-dom'
import {Box} from '@mui/material'
import {Login} from './Components/Login'
import {LoginContext, RolesContext} from './Hooks/useHooks'



function App() {
  const [logged, setLogged] = useState(false)
  const [role, setRole] = useState(null)

  return (
    <div className="App">
        {/*<TemporaryDrawer />*/}
        <LoginContext.Provider value={{logged, setLogged}}>
          <RolesContext.Provider value={{role, setRole}}>
          <Routes>
            <Route path='*' element={<MiniDrawer />} />
            <Route path='Login' element={<Login />} />
          </Routes>
         </RolesContext.Provider>
        </LoginContext.Provider>
        
    </div>
  );
}

export default App;
