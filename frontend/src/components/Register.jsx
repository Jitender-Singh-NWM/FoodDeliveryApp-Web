import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10)
console.log('salt==>',salt);


const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    var [password, setPassword] = useState();
    const navigate = useNavigate();
     // hash created previously created upon sign up


    const handleSubmit = (event) => {
        event.preventDefault();
        const hashedPassword = bcrypt.hashSync(password, salt)
        //    return /\d/.test(str);
        
        var check = /\d/.test(name);
        var lengthCheck = /^.{8}$/;
            var uppercaseCheck = /[A-Z]/;
            var numberCheck = /\d/;
            var specialCharCheck = /[!@#$%^&*()_+]/;

        if(check){
            alert("Name cannot contain numbers");
            return;
        }

        
        if(!(password.length>=8 && uppercaseCheck.test(password) && numberCheck.test(password) && specialCharCheck.test(password))){
            alert("Password should be 8 characters length,it should have a capital letter and special character!");
            return;
        }
        
        password=hashedPassword;

        
        axios.post( 'http://localhost:3001/register', {name, email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Already registered"){
                alert("E-mail already registered! Please Login to proceed.");
                navigate('/login');
            }
            else{
                alert("Registered successfully! Please Login to proceed.")
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
                    <h2 className='mb-3 text-primary'>Just Grab Register</h2>
                    <form onSubmit={handleSubmit}>
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