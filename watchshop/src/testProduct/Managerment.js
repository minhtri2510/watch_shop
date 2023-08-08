import React, { useState } from 'react'
import AddItem from './addItem'
import ListSP from './ListSP'
import Nav from '../component/Nav'
import UserManagerment from './UserManagerment'
// import '../css/Menucss.css'

export default function Managerment(props) {
    const [ShowComponent, setShowComponent] = useState("addProduct")
    const [UpdateProduct, setUpdateProduct] = useState({
        idProduct: "",
        productName: "",
        img: "",
        category: "",
        loaiMay: "",
        kinh: "",
        kieuDang: "",
        duongKinh: "",
        chatLieuVo: "",
        chatLieuDay: "",
        baoHanh: "",
        quantity: "",
        price: "",
    });
    const hanldeShowComponent = (conp) => {
        setShowComponent(conp)
    }
    const handleUpdate = (props) => {
        setUpdateProduct({
            idProduct: props.idProduct,
            productName: props.productName,
            img: props.img,
            category: props.category,
            loaiMay: props.loaiMay,
            kinh: props.kinh,
            kieuDang: props.kieuDang,
            duongKinh: props.duongKinh,
            chatLieuVo: props.chatLieuVo,
            chatLieuDay: props.chatLieuDay,
            baoHanh: props.baoHanh,
            quantity: props.quantity,
            price: props.price,
        })
        console.log("1")
        console.log(UpdateProduct)
    }

    return (
        <>
            <div className='row m-0'>
                <Nav cart={props.cart}
                    handleQuantity={props.handleQuantity}
                    deleteItem={props.deleteItem}
                    getItemToCart={props.getItemToCart}
                    setCart={props.setCart} />
            </div>
            <div className='container'>
                <div className='row m-0'>
                    <div id="menu" className='col-3 bg-light border border-light rounded shadow-lg mt-5 mb-5 '>
                        <div className='row justify-content-center text-black p-3 '>
                            <button className='btn btn-primary' onClick={() => hanldeShowComponent("user")}>User Managerment</button>
                        </div>
                        <div className='row justify-content-center text-black p-3'>
                            <button className='btn btn-primary' onClick={() => hanldeShowComponent("listProduct")}>List Product</button>
                        </div>
                        <div className='row justify-content-center text-black p-3'>
                            <button className='btn btn-primary' onClick={() => { hanldeShowComponent("addProduct") }}>Add Product</button>
                        </div>
                    </div>
                    <div className='col-9'>
                        {ShowComponent === "addProduct" ? <AddItem UpdateProduct={UpdateProduct} setUpdateProduct={setUpdateProduct} /> :
                            ShowComponent === "user" ? <UserManagerment /> : <ListSP handleUpdate={handleUpdate} hanldeShowComponent={hanldeShowComponent} />
                        }
                    </div>
                </div >
            </div>
        </>
    )
}
