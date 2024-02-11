import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("in Forgot");
    axios.post('http://localhost:3001/forgot-password', { email })
      .then(result => {
        console.log(result);
        if (result.data === "Password reset email sent!") {
          console.log("Password reset email sent!");
          alert('Password reset email sent!')
          navigate('/Login');
        } else {
          alert('Incorrect Email! Please try again.');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{ backgroundImage: `url("https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`, backgroundRepeat: 'no-repeat', width: '100%' }}>
        <div className="bg-white p-3 rounded" style={{ width: '40%' }}>
          <h2 className='mb-3 text-primary'>Forgot Password ?</h2>
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

            <button type="submit" className="btn btn-primary">Reset</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Forgot;
