import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ListSP(props) {
    useEffect(() => {
        callApi();
    },[])

    const [product, setProduct] = useState([])

    const deleteItem= (id)=>{
         axios.delete(`http://localhost:8080/api/product/delete/${id}`)
        .then(()=>{
            callApi()
            console.log("success")
        }).catch((err)=>{
            console.log(err)
        })
    }

    const callApi = () => {
        axios
            .get("http://localhost:8080/api/product/list")
            .then((response) => {
                setProduct(
                    response.data
                )
                // console.log(product);
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    }

 

    return (
        <div className=' d-flex flex-column bg-primary p-3 mt-5 mb-5 border border-info rounded shadow-lg mb-5 bg-white rounded'>
        <h1>List Product</h1>
            <table class="table">
                <thead class="thead-dark text-alige-left">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">img</th>
                        <th scope="col">baoHanh</th>
                        <th scope="col">quantity</th>
                        <th scope="col">action</th>

                    </tr>
                </thead>
                <tbody>
                    {product.map((item) => {
                        return (
                            <tr>
                                <th scope="row">{item.idProduct}</th>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td><img src={`http://localhost:8080/api/product/get-image/${item.img}`}alt='sss' width={60} height={60}/></td>
                                <td>{item.baoHanh}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <button onClick={()=>deleteItem(item.idProduct)}>delete</button>
                                    <button onClick={()=>{props.handleUpdate(item); props.hanldeShowComponent("addProduct")}}>update</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}
