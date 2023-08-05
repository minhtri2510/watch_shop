import React, { useState,useEffect } from 'react'
import axios from 'axios';

export default function UserManagerment() {

    useEffect(() => {
        callApi();
    }, [])

    const [user, setUser] = useState([])

    // const deleteItem= (id)=>{
    //      axios.delete(`http://localhost:8080/api/product/delete/${id}`)
    //     .then(()=>{
    //         callApi()
    //         console.log("success")
    //     }).catch((err)=>{
    //         console.log(err)
    //     })

    const callApi = () => {
        axios
            .get("http://localhost:8080/api/userManagerment/")
            .then((response) => {
                setUser(
                    response.data
                )
                //    product=response.data;
                console.log(user);
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    }

    return (
        <div className=' d-flex flex-column bg-primary p-3 mt-5 mb-5 border border-info rounded shadow-lg mb-5 bg-white rounded'>
            <div className='row pb-3'>
                <h1>List User</h1>
            </div>
            <div className='row'>
                <table class="table">
                    <thead class="thead-dark text-alige-left">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            {/* <th scope="col">img</th> */}
                            <th scope="col">Age</th>
                            <th scope="col">action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {user.map((item) => {
                            return (
                                <tr>
                                    <th scope="row">{item.idUser}</th>
                                    <td>{item.userName}</td>
                                    {/* <td>{item.price}</td> */}
                                    {/* <td>{item.img}</td> */}
                                    {/* <td><img src={`http://localhost:8080/api/product/get-image/${item.img}`}alt='sss' width={60} height={60}/></td> */}
                                    <td>{item.age}</td>
                                    <td>
                                        <button >delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}
