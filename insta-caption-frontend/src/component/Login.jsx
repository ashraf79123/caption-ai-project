import { useState } from 'react';
import API from '../utils/axiosConfig';
import './Login.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [data, setData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/login', data);
      toast.success('Logged in successfully');
      navigate('/');
    } catch (err) {
      toast.error("Invalid username or password.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" onChange={(e) => setData({ ...data, username: e.target.value })} />
        <input placeholder="Password" type="password" onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
