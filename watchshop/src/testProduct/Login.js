import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../component/Nav'
import '../css/Login.css'

export default function Login(props) {

  const history = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    passWork: "",
  })
  const handleChange = (event) => {

    const { name, value } = event.target;

    setUser((prevState) => ({

      ...prevState,

      [name]: value,

    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập ở đây (gọi API, kiểm tra thông tin đăng nhập,...)
    axios.post(`http://localhost:8080/api/user/login`, user)
      .then(() => {
        history('/');
        localStorage.setItem("user", true)

        console.log("success")
        //  const isLogin =  localStorage.getItem("user") === "true";

      }).catch((err) => {
        console.log(err)
      })


  };

  return (
    <>
      <Nav cart={props.cart} />
      <form onSubmit={handleSubmit} className='form1'>
        <div class="login-form">
          <h1>LOGIN</h1>
          <div class="form-group ">
            <input type="text" class="form-control" placeholder="Username "
              name='userName'
              value={user.userName}
              onChange={handleChange}
              required id="UserName" />
            <i class="mdi mdi-account"></i>
          </div>
          <div class="form-group log-status">
            <input type="password" class="form-control"
              name='passWork'
              id="password"
              value={user.passWork}
              onChange={handleChange}
              required
              placeholder="Password" />
            <i class="mdi mdi-lock"></i>
          </div>
          <span class="alert">Invalid Credentials</span>
          <a class="link" href="/">Lost your password?</a>
          <button type="submit" class="log-btn" ><i class="mdi mdi-account"></i> Log in</button>
        </div>
      </form>

    </>
  )
}
