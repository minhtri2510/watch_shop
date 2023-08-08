import React, { useState, useEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

import Swal from 'sweetalert2';
import axios from 'axios';
import Login from '../testProduct/Login';
import View from './View';
import Register from '../testProduct/Register';
import Managerment from '../testProduct/Managerment';
import { useNavigate } from 'react-router-dom';
import Detail from './detail';


const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [listproduct, setListProduct] = useState([]);
  const [detailProd, setDetailProd] = useState([]);
  const [Product] = useState({
    idUser: "",
    idProduct: "",
    quantity: 1
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts();
    getCarts();
  }, []);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/product/list')
      .then(response => {
        const products = response.data;
        setListProduct(products);
        setData(products);
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
    const User = localStorage.getItem('user');

    if (!User) {
      window.alert("Bạn chưa đăng nhập")
      return;
    }
    const cloneCart = [...cart];

    const foundItem = cloneCart.find((item) => item.product.id === prod.id);

    if (foundItem) {
      foundItem.quantity += number;
    } else {
      const cartItem = {
        product: Product,
        quantity: number,
      };
      cloneCart.push(cartItem);
    }
    handAlert();
    setCart(cloneCart);
    console.log(cart);
  };
  const getCarts = () => {
    const user = localStorage.getItem("user");
    console.log(user)
    axios
      .get(`http://localhost:8080/api/cart/list/${user}`)
      .then((response) => {
        console.log(response.data)
        setCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getItemToCart = (product, quantity) => {
    const user = localStorage.getItem("user");
    console.log(product);
    if (user) {
      axios
        .post("http://localhost:8080/api/cart/add", {
          productId: product.idProduct,
          userId: user,
          quantity: quantity,
        })
        .then((response) => {
          Swal.fire({
            title: "thành công",
            icon: "success",
          });
          getCarts();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.alert("Bạn chưa đăng nhập")
      navigate("/login");
    }
  };

  const deleteItem = (id) => {

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
        axios.delete(`http://localhost:8080/api/cart/${id}`).then(() => {
          Swal.fire(
            'Thành công!',
            'Bạn đã xoá thành công',
            'success'
          );
          getCarts()
        }).catch((error) => {
          console.log(error)
        })
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
        <Route path='/login' element={<Login cart={cart} getCarts={getCarts} />}></Route>
        <Route path='/register' element={<Register cart={cart} />}></Route>
        <Route path='/' element={<View
          setCart={setCart}
          cart={cart}
          handleCategory={handleCategory}
          product={detailProd}
          addToCart={addToCart}
          listproduct={listproduct}
          detail={detail}
          handleQuantity={handleQuantity}
          deleteItem={deleteItem}
          getItemToCart={getItemToCart}
        />}></Route>
        <Route path='/managerment' element={<Managerment
          cart={cart}
          handleQuantity={handleQuantity}
          deleteItem={deleteItem}
          getItemToCart={getItemToCart}
          setCart={setCart}
        />}></Route>
        <Route path='/detail/:id' element={<Detail
          getItemToCart={getItemToCart}
          cart={cart}
          handleQuantity={handleQuantity}
          deleteItem={deleteItem}
          setCart={setCart}
        />} />
      </Routes>

    </>
  );
};

export default Home;
