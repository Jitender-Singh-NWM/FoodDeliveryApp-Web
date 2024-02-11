import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Select,message } from 'antd';
import { useLocation } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // console.log("userType",userType);
    const navigate = useNavigate();       // Ashok 14 - 19
    const loc = useLocation()
    console.log("loc",loc);
    const user = loc.search;
    console.log("user",user.slice(1));
    const [userType,SetUserType] = useState(user.slice(1));


    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/register', {name, email, password,userType})
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                // alert("E-mail already registered! Please Login to proceed.");
                message.success('Registered successfully');
                navigate('/login');
            }
            else{
                message.success("Registered successfully! Please Login to proceed.")
                navigate('/login');
            }
            
        })
        .catch(err => console.log(err));
    }


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : `url("https://images.unsplash.com/photo-1608835291093-394b0c943a75?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,backgroundRepeat: 'no-repeat',
  width:'100%'  }}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Register</h2>
                    <form onSubmit={handleSubmit}>
                   {user !== "?admin" && <div className="mb-3 text-start">
                    <label htmlFor="UserType" className="form-label">
                    <strong >Select User</strong>
                    </label><br/>
                    <Select
                        placeholder="Select a User Type"
                        optionFilterProp="children"
                        onChange={(value) => SetUserType(value)} 
                        style={{ width: '100%' }}
                    >
                        <Select.Option value="Customer">Customer</Select.Option>
                        <Select.Option value="Delivery Agent">Delivery Agent</Select.Option>
                    </Select>
                    </div>
                    }
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong >Name</strong>
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                className="form-control" 
                                id="exampleInputname" 
                                onChange={(event) => setName(event.target.value)}
                                required
                            /> 
                        </div>
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
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>

                    <p className='container my-2'>Already have an account ?</p>
                    <Link to='/login' className="btn btn-secondary">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register