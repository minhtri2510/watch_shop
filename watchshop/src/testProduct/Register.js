import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Nav from "../component/Nav"

export default function Register(props) {


    const history = useNavigate();
    const [user, setUser] = useState({
        userName: "",
        passWork: "",
        age: ""
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
        axios.post(`http://localhost:8080/api/user/`, user)
            .then(() => {
                window.alert("đăng ký thành công")
                history('/login');
                console.log("success")
            }).catch((err) => {
                window.alert("Tên đăng nhập đã được đăng ký!")
                console.log(err)
            })

        console.log('Email:', user.userName);
        console.log('Password:', user.passWork);

    };

    return (
        <>
            <Nav cart={props.cart} />
            <form onSubmit={handleSubmit}>
                <div class="login-form">
                    <h1>REGISTER</h1>
                    <div class="form-group ">
                        <input type="text" class="form-control text-dark" placeholder="Username "
                            name='userName'
                            value={user.userName}
                            onChange={handleChange}
                            required id="UserName" />
                        <i class="mdi mdi-account"></i>
                    </div>
                    <div class="form-group log-status">
                        <input type="password" class="form-control text-dark"
                            name='passWork'
                            id="password"
                            value={user.passWork}
                            onChange={handleChange}
                            required
                            placeholder="Password" />
                        <i class="mdi mdi-lock"></i>
                    </div>
                    <div class="form-group">
                        <input
                            type="number"
                            className="form-control text-dark"
                            name='age'
                            id="password"
                            value={user.age}
                            onChange={handleChange}
                            required
                            placeholder="Age" 
                        />
                    </div>
                    <span class="alert">Invalid Credentials</span>
                    <a class="link" href="/">Lost your password?</a>
                    <button type="submit" class="log-btn" ><i class="mdi mdi-account"></i>Register</button>
                </div>
            </form>
        </>
    )
}
