import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from '../component/Nav'
import '../css/Login.css'
import Swal from 'sweetalert2';

export default function Login(props) {

  const history = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    passWork: "",
  })

  const [errors, setErrors] = useState({
    userName: '',
    passWork: '',
  });

  const handleChange = (event) => {

    const { name, value } = event.target;

    setUser((prevState) => ({

      ...prevState,

      [name]: value,

    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};

    if (!user.userName) {
      newErrors.userName = 'Username is required';
    }

    if (!user.passWork) {
      newErrors.passWork = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Xử lý đăng nhập ở đây (gọi API, kiểm tra thông tin đăng nhập,...)
      axios.post(`http://localhost:8080/api/user/login`, user)
        .then((response) => {
          history('/');
          localStorage.setItem("user", response.data.idUser)
          localStorage.setItem("role", response.data.role)

          props.getCarts();
          Swal.fire({
            title: "Login thành công",
            icon: "success",
          });

        }).catch((err) => {
          console.log(err)
        })
    }

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
               id="UserName" />
            <i class="mdi mdi-account"></i>
            {errors.userName && <span className='error-message text-danger'>{errors.userName}</span>}
          </div>
          <div class="form-group log-status">
            <input type="password" class="form-control"
              name='passWork'
              id="password"
              value={user.passWork}
              onChange={handleChange}
              
              placeholder="Password" />
            <i class="mdi mdi-lock"></i>
            {errors.passWork && <span className='error-message text-danger'>{errors.passWork}</span>}
          </div>
          <span class="alert">Invalid Credentials</span>
          <a class="link" href="/">Lost your password?</a>
          <button type="submit" class="log-btn" ><i class="mdi mdi-account"></i> Log in</button>
        </div>
      </form>

    </>
  )
}
