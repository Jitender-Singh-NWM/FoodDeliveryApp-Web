import Home from './Home';
import Login from './Login';
import Register from './Register';
import Forgot from './forgot';
import PasswordResetpage from './PasswordResetpage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Restaurants from './Restaurants';

function App() {

  return (
    // <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Register/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/Restaurants/:restaurantname" element={<Restaurants/>}/>
          <Route path="/forgot" element ={<Forgot/>} />
          <Route path="/PasswordResetpage" element ={<PasswordResetpage/>} />
        </Routes>
      </BrowserRouter>
    // </div>
  )
}

export default App
