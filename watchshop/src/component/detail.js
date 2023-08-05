import React, { Component } from 'react'
import "../css/detailcss.module.css"

export default class demo extends Component {
  state = {
    quantity: 1
  }
  handleInput = (event) => {
    // Lấy giá trị của trường input từ event.target.value
    this.setState({
      quantity: event.target.value
    })
  };
  handleIncrease = (isTrue) => {
    var soLuong = this.state.quantity;
    if (isTrue) {
      soLuong = Number(soLuong) + 1;
      this.setState({
        quantity: soLuong,
      }
      )
    } else if (this.state.quantity > 1) {
      soLuong = Number(soLuong) - 1;
      this.setState({
        quantity: soLuong
      })
    }
    console.log(this.state.quantity);
  }

  render() {
    return (
      <div className='d-flex'>
        <div>
          <img height={"500px"} src={this.props.product.img} alt='acc' />
        </div>
        <div>
          <h2 >{this.props.product.name}</h2>
          <table className='table text-dark' >
            <tbody>
              <tr>
                <td>Xuất xứ</td>
                <td>{this.props.product.thuongHieu}</td>
              </tr>
              <tr>
                <td>Loại máy</td>
                <td>{this.props.product.loaiMay}</td>
              </tr>
              <tr>
                <td>Kính</td>
                <td>{this.props.product.kinh}</td>
              </tr>
              <tr>
                <td>Kiểu dáng</td>
                <td>{this.props.product.kieuDang}</td>
              </tr>
              <tr>
                <td>Đường kính</td>
                <td>{this.props.product.duongKinh}</td>
              </tr>
              <tr>
                <td>Chất liệu vỏ</td>
                <td>{this.props.product.chatLieuVo}</td>
              </tr>
              <tr>
                <td>Chất liệu dây</td>
                <td>{this.props.product.chatLieuDay}</td>
              </tr>
              <tr>
                <td>Bảo hành</td>
                <td>{this.props.product.baoHanh}</td>
              </tr>
            </tbody>
          </table>
          <h5 className='d-flex justify-content-start'>Giá bán: {this.props.product.price.toLocaleString()}VND</h5>
          <div >
            <button className="btn btn-info"
              onClick={() => this.handleIncrease(false)}
            >
              -
            </button>
            <span className='m-4'>{this.state.quantity}</span>
            {/* <input  width={"33px"} type='text' value={this.state.quantity} onChange={this.handleInput}/> */}
            <button className="btn btn-info"
              onClick={() => this.handleIncrease(true)}
            >
              +
            </button>
          </div>
          <br />
          <button
            onClick={() => {
              this.props.addToCart(this.props.product, this.state.quantity)
            }
            }
            className="btn btn-warning"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    )
  }
}
