import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class nav extends Component {
    render() {
        return (
            <nav class="row bg-dark m-0" style={{height:"70px"}}>
                <div className='col-10 d-flex p-0'>
                    <Link to={"/"}>
                    <img src='https://watchshop.com.vn/wp-content/uploads/2022/06/LOGO-2-1.png' alt='logo' width={"auto"} height={"70px"}/>
                    </Link>
                </div>
                <div className='col-2 d-flex flex-row-reverse ' >
                    <button className='btn btn-outline-light p-2' style={{border: 'none',}} type="button "  data-toggle="modal" data-target="#exampleModal" width={"70px"} height={"70px"}>
                    <i class="fa-solid fa-cart-shopping" style={{color:"#fff"}}/>Shopping(<span>{this.props.cart.length}</span>)
                    </button>
                </div>

            </nav>

        )
    }
}
