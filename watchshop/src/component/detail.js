import React, { Component } from 'react'
import "../component/detailcss.module.css"

export default class demo extends Component {
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
          <h5>Giá bán: {this.props.product.price.toLocaleString()}VND</h5>
          <button
            onClick={() => {
              this.props.addToCart(this.props.product)
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
