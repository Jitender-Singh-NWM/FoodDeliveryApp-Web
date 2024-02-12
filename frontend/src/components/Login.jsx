import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CometChatUIKit,UIKitSettingsBuilder } from "@cometchat/chat-uikit-react";



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
                const COMETCHAT_CONSTANTS = {
                    APP_ID: "24883762280afdf7", //Replace with your App ID
                    REGION: "us", //Replace with your App Region
                    AUTH_KEY: "4041814a5efc490013934431c8e39554d614af4a" //Replace with your Auth Key
                    }
                    
                    //create the builder
                    const UIKitSettings = new UIKitSettingsBuilder()
                      .setAppId(COMETCHAT_CONSTANTS.APP_ID)
                      .setRegion(COMETCHAT_CONSTANTS.REGION)
                      .setAuthKey(COMETCHAT_CONSTANTS.AUTH_KEY)
                      .subscribePresenceForFriends()
                      .build();
                    
                    //Initialize CometChat UIKit
                    CometChatUIKit.init(UIKitSettings).then(() => {
                      console.log("Initialization completed successfully");
                      // You can now call login function.
                    }).catch(console.log);


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


    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style= {{backgroundImage : `url("https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,backgroundRepeat: 'no-repeat',
  width:'100%'  }}>
                <div className="bg-white p-3 rounded" style={{width : '40%'}}>
                    <h2 className='mb-3 text-primary'>Just Grab Login</h2>
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
                    {/* TO add ' appostopee */}
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link><br/><br/>
                    <Link to='/forgot' className="btn btn-warning">Forgot Password ?</Link>
                </div>
            </div>
        </div>
    )
}

export default Login