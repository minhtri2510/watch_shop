import React from 'react';
// import Style from '../css/styleCartItem.module.css';
import { Link } from 'react-router-dom';

const CardItem = (props) => {
  console.log(props.item)
  return (
    // <div>
    //   <div className={Style.card}>
    //     <img className='card-img'
    //       // src={props.item.img}
    //       src={`http://localhost:8080/api/product/get-image/${props.item.img}`}
    //       style={{ width: `325px`, height: `486px` }}
    //       alt="zxc"
    //     />
    //     <div className="card-content h-100 d-flex flex-column justify-content-around align-items-center" >
    //       <h2>{props.item.name}</h2>
    //       <table className='table table-dark text-dark'>
    //         <tr>
    //           <td>Xuất xứ</td>
    //           <td>{props.item.thuongHieu}</td>
    //         </tr>
    //         <tr>
    //           <td>Loại máy</td>
    //           <td>{props.item.loaiMay}</td>
    //         </tr>
    //         {/* Các trường dữ liệu khác tương tự */}
    //       </table>
    //       <h5>Giá bán: {props.item.price}đ</h5>
    //       {/* <h5>Giá bán: {props.item.price.toLocaleString()}đ</h5> */}
    //       <div>
    //         <button
    //           onClick={() => {
    //             props.getItemToCart(props.item, 1);
    //           }}
    //           className="btn btn-warning"
    //         >
    //           Thêm vào giỏ
    //         </button>
    //         <Link to={`/detail/${props.item.idProduct}`}>
    //           <button className="btn btn-primary text-light" type='button' 
    //           // onClick={() => props.detail(props.item)}
    //           >
    //             Xem chi tiết
    //           </button>
    //         </Link>
    //         {/* <button className="btn btn-primary text-light" type='button' onClick={() => props.detail(props.item)}>
    //             Xem chi tiết
    //           </button> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div class="card h-100">
      <img class="card-img-top"
        src={`http://localhost:8080/api/product/get-image/${props.item.img}`}
        //       style={{ width: `325px`, height: `486px` }}
        alt="product"
      />
      <div class="card-body d-flex flex-column justify-content-between">
        <h5 class="card-title">{props.item.productName}</h5>
        <div className='d-flex flex-column'>
          <h6 className='text-danger'>Giá bán: {props.item.price.toLocaleString()}đ</h6>
          <div className='row d-flex justify-content-around'>
            <button
              onClick={() => {
                props.getItemToCart(props.item, 1);
              }}
              className="col-6 d-flex btn btn-warning"
            >
              Thêm vào giỏ
            </button>
            <button className="col-5 btn d-flex btn-primary justify-content-center"
            >
              <Link to={`/detail/${props.item.idProduct}`} className='text-align-center text-dark'>
                Chi tiết
              </Link>
            </button>

          </div>
        </div>
      </div>
    </div >
  );
};

export default CardItem;
