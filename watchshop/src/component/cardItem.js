import React, { Component } from 'react'
import Style from '../css/styleCartItem.module.css'
import { Link } from 'react-router-dom'

export default class cardItem extends Component {
    render = () => {
        return (
            <>
                <div>
                    <div className={Style.card}>
                        <img
                            src={this.props.item.img}
                            style={{ width: `325px`, height: `486px` }}
                            alt="zxc"
                        />
                        <div className="card-content h-100 d-flex flex-column justify-content-around align-items-center" >
                            <h2 >{this.props.item.name}</h2>
                            <table className='table table-dark text-dark'>
                                <tr>
                                    <td>Xuất xứ</td>
                                    <td>{this.props.item.thuongHieu}</td>
                                </tr>
                                <tr>
                                    <td>Loại máy</td>
                                    <td>{this.props.item.loaiMay}</td>
                                </tr>
                                <tr>
                                    <td>Kính</td>
                                    <td>{this.props.item.kinh}</td>
                                </tr>
                                <tr>
                                    <td>Kiểu dáng</td>
                                    <td>{this.props.item.kieuDang}</td>
                                </tr>
                                <tr>
                                    <td>Đường kính</td>
                                    <td>{this.props.item.duongKinh}</td>
                                </tr>
                                <tr>
                                    <td>Chất liệu vỏ</td>
                                    <td>{this.props.item.chatLieuVo}</td>
                                </tr>
                                <tr>
                                    <td>Chất liệu dây</td>
                                    <td>{this.props.item.chatLieuDay}</td>
                                </tr>
                                <tr>
                                    <td>Bảo hành</td>
                                    <td>{this.props.item.baoHanh}</td>
                                </tr>
                            </table>
                            <h5>Giá bán: {this.props.item.price.toLocaleString()}đ</h5>
                            <div >
                                <button
                                    onClick={() => {
                                        this.props.addToCart(this.props.item,1)
                                    }
                                    }
                                    className="btn btn-warning"
                                >
                                    Thêm vào giỏ
                                </button>

                                <Link to={"/detail"}>
                                    <button className="btn btn-primary text-ligth"
                                        type='button'
                                        onClick={() => this.props.detail(this.props.item)}>
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>

                </div >
            </>
        )
    }
}
