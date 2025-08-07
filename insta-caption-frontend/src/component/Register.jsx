import { useState } from 'react';
import API from '../utils/axiosConfig';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Register() {
  const [data, setData] = useState({ username: '', password: '' });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', data);
      toast.success('Registered successfully');
      navigate("/login")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register-container">
      <h2 className="form-heading">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          className="input-field"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          required
        />
        <input
          className="input-field"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          required
        />
        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}

export default Register;
