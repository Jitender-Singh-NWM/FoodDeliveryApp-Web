import Home from './Home';
import Login from './Login';
import Register from './Register';
import Forgot from './forgot';
//import Maps from './Maps';

//<Maps></Maps>
import PasswordResetpage from './PasswordResetpage';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {

  return (
    <div style={{marginTop : '-3.5rem'}}>
      <BrowserRouter >
        <Routes>
          <Route path="/" element ={<Login/>} />
          <Route path="/register" element ={<Register/>} />
          <Route path="/login" element ={<Login/>} />
          <Route path="/home" element ={<Home/>} />
          <Route path="/forgot" element ={<Forgot/>} />
          <Route path="/PasswordResetpage" element ={<PasswordResetpage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
