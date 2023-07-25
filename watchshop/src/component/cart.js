import React, { Component } from 'react'

export default class cart extends Component {
    truncateText(string, maxLength) {
        if (string.length > maxLength) {
            string = string.substr(0, maxLength) + "...";
        }
        return string;
      }
    

    render() {
        const sumTotal= this.props.cart.reduce((total,item)=>{
            return total+item.product.price*item.quantity;
        },0);

        return (
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Giỏ hàng</h5>
                            <button type="button" class="close btn" data-dismiss="modal" aria-label="Close">
                            X
                            </button>
                        </div>
                        <div class="modal-body">
                            <table className="table table-striped">
                                <thead className='thead-light'>
                                    <tr>
                                        <th>Product ID</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.props.cart.map((item) => (
                                        
                                        <tr key={item.product.id}>
                                            <td>{item.product.id}</td>
                                            <td >{this.truncateText(item.product.name,10)}</td>
                                            <td><img src={item.product.img} alt='acc' height={50} width={50}></img></td>
                                            <td>
                                                <button className="btn btn-info"
                                                    onClick={() =>this.props.handleQuantity(item, false) }
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button className="btn btn-info"
                                                    onClick={() =>this.props.handleQuantity(item, true) }
                                                >
                                                    +
                                                </button>
                                            </td>
                                            <td>{item.product.price}</td>
                                            <td >{item.product.price * item.quantity}</td>
                                            <td>
                                                <button class="btn btn-danger" onClick={()=>{this.props.deleteItem(item.product)}}>delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                
                            </table>
                            <b>Tổng tiền : <span className='text-warning'>{sumTotal.toLocaleString()}VND</span></b>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Thoát</button>
                            <button type="button" class="btn btn-primary">Thanh toán</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


