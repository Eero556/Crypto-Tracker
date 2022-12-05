
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import {useContext } from "react"
import Profile from './pages/Profile';
import CoinList from './pages/CoinList';
import CoinDetailPage from './pages/CoinDetailPage';
import { UserContext } from "./Context/LoginContext"



function App() {
  const { loggedin } = useContext(UserContext)


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {!loggedin ? (<><Route path='/auth/login' element={<Login />}></Route>
            <Route path='/auth/register' element={<Register />}>
              </Route><Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/coins/:id' element={<CoinDetailPage/>}></Route>
              </>)
             : 
            (<>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/watchlist' element={<CoinList/>}></Route>
            <Route path='/coins/:id' element={<CoinDetailPage/>}></Route>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            </>)}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
