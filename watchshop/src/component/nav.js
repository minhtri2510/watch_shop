import { Link } from 'react-router-dom'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Nav(props) {

    const Navigate = useNavigate();
    const user = localStorage.getItem("user");

    const hanldLogout = () => {
        localStorage.removeItem("user");
        Navigate("/");
    }

    return (
        <nav class="row bg-dark m-0" style={{ height: "70px" }}>
            <div className='col-9 d-flex p-0'>
                <Link to={"/"}>
                    <img src='https://watchshop.com.vn/wp-content/uploads/2022/06/LOGO-2-1.png' alt='logo' width={"auto"} height={"70px"} />
                </Link>
            </div>
            <div className='col-3 d-flex flex-row-reverse ' >
                <div className='p-3'>
                    <button className='btn btn-outline-light p-2' type="button " data-toggle="modal" data-target="#exampleModal">
                        <i class="fa-solid fa-cart-shopping" style={{ color: "blue" }} />(<span>{props.cart.length}</span>)
                    </button>
                </div>
                <div class="dropdown p-3">
                    <button type="button" class="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown">
                        <i class="fa-solid fa-circle-user" style={{ color: "#7194d1" }}></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li>
                            {user ? <Link to={"/"}><a class="dropdown-item" href="/" onClick={() => hanldLogout()}>logout</a></Link> :
                                <Link to={"/login"}>
                                    <a href='/' class="dropdown-item">LogIn</a>
                                </Link>
                            }
                        </li>
                        <li>
                            <Link to={"/managerment"}><a class="dropdown-item" href="/managerment">Managerment</a></Link>
                            </li>

                        <li><Link to={"/register"}><a class="dropdown-item" href="/register">Register</a></Link></li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}