import React, { Component } from 'react'
import NavProduct from './nav'
import ProductList from './productList'
import '../component/tree.css'
import Cart from './cart'
import Carousel from './Carousel'
import Footer from './footer'
import ListCategory from './listCategory'
import { Route, Routes } from 'react-router-dom'
import Detail from './detail'
import Swal from 'sweetalert2'

const data = require('../data/product.json');
export default class home extends Component {

    state = {
        cart: [],
        listproduct: data,
        detailProd: []
    };

    handAlert = () => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thêm giỏ hàng thành công',
            showConfirmButton: false,
            timer: 1500
        });
    }
    //them vao gio hang
    addToCart = (prod) => {
        const cloneCart = [...this.state.cart];

        const foundItem = cloneCart.find((item) => {
            return item.product.id === prod.id;
        });

        if (foundItem) {
            //+=1 quantity san pham da co trong cart
            foundItem.quantity += 1;
        } else {
            //? thêm mới sản phẩm
            const cartItem = {
                product: prod,
                quantity: 1,
            };
            cloneCart.push(cartItem);
        }
        this.handAlert();
        this.setState(
            {
                cart: cloneCart,
            },
            () => {
                console.log(this.state.cart);
            }
        );
    };

    //xoá item trong giỏ hàng
    deleteItem = (id) => {
        const cloneCart = [...this.state.cart];
        const index = cloneCart.findIndex((item) => item.product === id);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cloneCart.splice(index, 1);
                this.setState({
                    cart: cloneCart,
                });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    };

    handleCategory = (category) => {
        const cloneProductList = category === true ? data : data.filter((item) => item.category === category)
        console.log(cloneProductList)
        this.setState({
            listproduct: cloneProductList,
        })
    };

    //tăng giảm số lượng hàng trong giỏ hàng
    handleQuantity = (prod, inIncrease) => {
        const cloneCart = [...this.state.cart];
        const index = cloneCart.findIndex((item) => item === prod);

        if (index === -1) {
            alert("Không tìm thấy sản phẩm");
            throw new Error("Không tìm thấy sản phẩm");
        }
        if (inIncrease) {
            cloneCart[index].quantity += 1;
        } else if (cloneCart[index].quantity > 1) {
            cloneCart[index].quantity -= 1;
        } else if (window.confirm(`Bạn có muốn xóa ${prod.name} không`)) {
            cloneCart.splice(index, 1);
        }
        this.setState({
            cart: cloneCart,
        });
    };

    detail = (prod) => {
        this.setState({
            detailProd: prod,
        })
    }

    render() {
        return (
            <>
                <NavProduct cart={this.state.cart} />
                <div className='container'>
                    <Carousel />
                    <br />
                    <ListCategory handleCategory={this.handleCategory} />
                    <br />
                    <Routes>
                        <Route path='/detail' element={<Detail product={this.state.detailProd} addToCart={this.addToCart} />}></Route>
                        <Route path='/' exact element={<ProductList
                            list={this.state.listproduct}
                            addToCart={this.addToCart}
                            detail={this.detail}
                        />} />
                    </Routes>

                    <Cart
                        cart={this.state.cart}
                        handleQuantity={this.handleQuantity}
                        deleteItem={this.deleteItem}
                    />
                </div>
                <Footer />
            </>
        )
    }
}
