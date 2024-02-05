import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/home');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }


    return (<div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Glassmorphism Login - hi.coder</title>
        <link rel="stylesheet" href="style.css" />
        <section className="container">
          <div className="login-container">
            <div className="circle circle-one" />
            <div className="form-container">
              <img src="./assets/illustration.png" alt="illustration" className="illustration" />
              <h1 className="opacity">LOGIN</h1>
              <form>
                <input type="text" placeholder="USERNAME" />
                <input type="password" placeholder="PASSWORD" />
                <button className="opacity">SUBMIT</button>
              </form>
              <div className="register-forget opacity">
                <a href>REGISTER</a>
                <a href>FORGOT PASSWORD</a>
              </div>
            </div>
            <div className="circle circle-two" />
          </div>
          <div className="theme-btn-container" />
        </section>
      </div>
        /*<div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : `url("https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,backgroundRepeat: 'no-repeat',
  width:'100%'  }}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    }
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link><br/>
                    <Link to='/forgot' className="btn btn-secondary">forgot-password</Link>
                </div>
            </div>
        </div>
    */)
}

export default Login