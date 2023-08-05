import React from 'react'
import NavProduct from './Nav';
import ProductList from './productList';
import Cart from './cart';
import Carousel from './Carousel';
import Footer from './footer';
import ListCategory from './listCategory';
import Detail from './detail';
import { Route, Routes } from 'react-router-dom';

export default function View(props) {
    return (
        <>
            <NavProduct cart={props.cart} />
            <div className='container'>
                <Carousel />
                <br />
                <ListCategory handleCategory={props.handleCategory} />
                <br />

                <Routes>
                    <Route path='/detail' element={<Detail product={props.detailProd} addToCart={props.addToCart} />}></Route>
                    <Route path='/' exact element={<ProductList
                        list={props.listproduct}
                        addToCart={props.addToCart}
                        detail={props.detail}
                    />} />
                </Routes>
                <Cart
                    cart={props.cart}
                    handleQuantity={props.handleQuantity}
                    deleteItem={props.deleteItem}
                />
                <br />
                <Footer />
            </div>
        </>
    )
}
