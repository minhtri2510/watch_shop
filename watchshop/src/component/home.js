import React, { useState, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import Swal from 'sweetalert2';
import axios from 'axios';
import Login from '../testProduct/Login';
import View from './View';
import Register from '../testProduct/Register';
import Managerment from '../testProduct/Managerment';

const data = require('../data/product.json');

const Home = () => {
  const [cart, setCart] = useState([]);
  const [listproduct, setListProduct] = useState(data);
  const [detailProd, setDetailProd] = useState([]);
  // const [isClickLogin, setIsClickLogin] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/product/list')
      .then(response => {
        const products = response.data;
        console.log(products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handAlert = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Thêm giỏ hàng thành công',
      showConfirmButton: false,
      timer: 500
    });
  };

  const addToCart = (prod, number) => {
    const cloneCart = [...cart];

    const foundItem = cloneCart.find((item) => item.product.id === prod.id);

    if (foundItem) {
      foundItem.quantity += number;
    } else {
      const cartItem = {
        product: prod,
        quantity: number,
      };
      cloneCart.push(cartItem);
    }
    handAlert();
    setCart(cloneCart);
    console.log(cart);
  };

  const deleteItem = (id) => {
    const cloneCart = [...cart];
    const index = cloneCart.findIndex((item) => item.product === id);

    Swal.fire({
      title: 'Bạn có chắn chắn xoá không?',
      text: "Bạn sẽ không thể hoàn tác điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'không'
    }).then((result) => {
      if (result.isConfirmed) {
        cloneCart.splice(index, 1);
        setCart(cloneCart);
        Swal.fire(
          'Thành công!',
          'Bạn đã xoá thành công',
          'success'
        );
      }
    });
  };

  const handleCategory = (category) => {
    const cloneProductList = category === true ? data : data.filter((item) => item.category === category);
    console.log(cloneProductList);
    setListProduct(cloneProductList);
  };

  const handleQuantity = (prod, inIncrease) => {
    const cloneCart = [...cart];
    const index = cloneCart.findIndex((item) => item === prod);

    if (index === -1) {
      alert("Không tìm thấy sản phẩm");
      throw new Error("Không tìm thấy sản phẩm");
    }
    if (inIncrease) {
      cloneCart[index].quantity += 1;
    } else if (cloneCart[index].quantity > 1) {
      cloneCart[index].quantity -= 1;
    } else if (window.confirm(`Bạn có muốn xóa ${cloneCart[index].product.name} không`)) {
      cloneCart.splice(index, 1);
    }
    setCart(cloneCart);
  };

  const detail = (prod) => {
    setDetailProd(prod);
  };

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login cart={cart}/>}></Route>
        <Route path='/register' element={<Register  cart={cart}/>}></Route>
        <Route path='/' element={<View
          cart={cart}
          handleCategory={handleCategory}
          product={detailProd}
          addToCart={addToCart}
          listproduct={listproduct}
          detail={detail}
          handleQuantity={handleQuantity}
          deleteItem={deleteItem}
        />}></Route>
        <Route path='/managerment' element={<Managerment cart={cart}/>}></Route>
      </Routes>

    </>
  );
};

export default Home;
