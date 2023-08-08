import React, { useEffect, useState } from 'react';
import "../css/detailcss.module.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

const Detail = (props) => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const handleInput = (event) => {
    // Lấy giá trị của trường input từ event.target.value
    setQuantity(event.target.value);
  };
  useEffect(() => {
    getDetailProduct();
  }, [])


  const getDetailProduct = () => {
    axios.get(`http://localhost:8080/api/product/getProduct/${id}`).
      then((res) => {
        console.log(res.data);
        setProduct(res.data);
      }).catch((er) => {
        console.log(er);
      });
  }
  const handleIncrease = (isTrue) => {
    let updatedQuantity = quantity;
    if (isTrue) {
      updatedQuantity = Number(updatedQuantity) + 1;
    } else if (updatedQuantity > 1) {
      updatedQuantity = Number(updatedQuantity) - 1;
    }
    setQuantity(updatedQuantity);
  };

  return (
    <>
      <Nav
        cart={props.cart}
        handleQuantity={props.handleQuantity}
        deleteItem={props.deleteItem}
        getItemToCart={props.getItemToCart}
        setCart={props.setCart}
      />
      <br/>
      <div className='container d-flex'>
        <div>
          <img height={"500px"} src={`http://localhost:8080/api/product/get-image/${product.img}`} alt='acc' />
        </div>
        <div>
          <h2>{product.productName}</h2>
          <table className='table text-dark'>
            <tbody>
              <tr>
                <td>Xuất xứ</td>
                <td>{product.category}</td>
              </tr>
              <tr>
                <td>Loại máy</td>
                <td>{product.loaiMay}</td>
              </tr>
              <tr>
                <td>Kính</td>
                <td>{product.kinh}</td>
              </tr>
              <tr>
                <td>Kiểu dáng</td>
                <td>{product.kieuDang}</td>
              </tr>
              <tr>
                <td>Đường kính</td>
                <td>{product.duongKinh}</td>
              </tr>
              <tr>
                <td>Chất liệu vỏ</td>
                <td>{product.chatLieuVo}</td>
              </tr>
              <tr>
                <td>Chất liệu dây</td>
                <td>{product.chatLieuDay}</td>
              </tr>
              <tr>
                <td>Bảo hành</td>
                <td>{product.baoHanh}</td>
              </tr>
            </tbody>
          </table>
          <h5 className='d-flex justify-content-start text-danger'>
            {product.price?(<p>Giá bán: {product.price.toLocaleString()}VND </p>):<></>}
          </h5>
          <div>
            <button className="btn btn-info" onClick={() => handleIncrease(false)}>
              -
            </button>
            <input style={{width:"45px"}} type='text' value={quantity} onChange={handleInput}/>
            <button className="btn btn-info" onClick={() => handleIncrease(true)}>
              +
            </button>
          </div>
          <br />
          <button
            onClick={() => {
              props.getItemToCart(product, quantity);
            }}
            className="btn btn-warning"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
