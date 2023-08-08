import React from 'react';

const Cart = (props) => {
  const truncateText = (string, maxLength) => {
    if (string.length > maxLength) {
      string = string.substr(0, maxLength) + "...";
    }
    return string;
  };

  const sumTotal = props.cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="modal fade" id="modalCart" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Giỏ hàng</h5>
            <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
              X
            </button>
          </div>
          <div className="modal-body">
            <table className="table table-striped ">
              <thead className='thead-light '>
                <tr>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Hình ảnh</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              {
              props.cart.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={"7"} className='text-center'>
                      <p className='text-danger'>Không có sản phẩm nào</p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                props.cart.map((item) => (
                  <tbody key={item.product.id}>
                    <tr>
                      <td>{item.product.idProduct}</td>
                      <td>{truncateText(item.product.productName, 10)}</td>
                      <td><img src={`http://localhost:8080/api/product/get-image/${item.product.img}`} alt='acc' height={50} width={50}></img></td>
                      <td>
                        <button className="btn btn-info" onClick={() => props.getItemToCart(item.product, -1)}>
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button className="btn btn-info" onClick={() =>  props.getItemToCart(item.product, 1)}>
                          +
                        </button>
                      </td>
                      <td>{item.product.price}</td>
                      <td>{item.product.price * item.quantity}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => { props.deleteItem(item.idCart) }}>Xoá</button>
                      </td>
                    </tr>
                  </tbody>
                ))
              )
              }
            </table>
            {props.cart.length > 0 ? (
              <b className='text-justify-center'>Tổng tiền : <span className='text-warning'>{sumTotal.toLocaleString()}VND</span></b>
            ) : (<></>)}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Thoát</button>
            <button type="button" className="btn btn-primary">Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
