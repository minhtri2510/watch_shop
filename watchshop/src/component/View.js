import { useState } from 'react'
import NavProduct from './Nav';
import ProductList from './ProductList';
// import Cart from './cart';
import Carousel from './Carousel';
import Footer from './footer';
import ListCategory from './listCategory';
import Detail from './detail';
import { Route, Routes } from 'react-router-dom';

export default function View(props) {
    const [detail] = useState(props.product);
    return (
        <>
            <NavProduct
                cart={props.cart}
                handleQuantity={props.handleQuantity}
                deleteItem={props.deleteItem}
                getItemToCart={props.getItemToCart}
                setCart={props.setCart}
            />
            <div className='container'>
                <Carousel />
                <br />
                <ListCategory handleCategory={props.handleCategory} />
                <br />
                {/* {detail ? <Detail detail={props.detail} addToCart={props.addToCart} product={props.product} /> :
                    <ProductList
                        list={props.listproduct}
                        addToCart={props.addToCart} detail={props.detail} />} */}
                {/* <Routes>
                    <Route path='/detail' element={<Detail product={props.detail} addToCart={props.addToCart} />}></Route>
                    <Route path='/' exact element={<ProductList
                        list={props.listproduct}
                        addToCart={props.addToCart}
                        detail={props.detail}
                    />} />
                </Routes> */}
                <ProductList
                    list={props.listproduct}
                    addToCart={props.addToCart} 
                    detail={props.detail}
                    getItemToCart={props.getItemToCart}
                />
                <br />
                <Footer />
            </div>
        </>
    )
}
