import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)


const Forgot = () => {
  const [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, salt)
        //    return /\d/.test(str);
        password=hashedPassword;
    console.log("in Forgot");
    axios.post('http://localhost:3001/Update-password', { email,password })
      .then(result => {
        console.log(result);
        if (result.data === "Password updated successfully") {
          console.log("Login Success");
          alert('"Password updated successfully"')
          navigate('/Login');
        } else {
          alert('Password Update Failed ! Please try again.');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: `url("https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, backgroundRepeat: 'no-repeat', width: '100%' }}>
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className='mb-3 text-primary'>Password Reset</h2>
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
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <strong>Confirm Password</strong>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot;
