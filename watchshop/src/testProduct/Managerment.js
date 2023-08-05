import React, { useState } from 'react'
import AddItem from './addItem'
import ListSP from './ListSP'
import Nav from '../component/Nav'
import UserManagerment from './UserManagerment'

export default function Managerment(props) {
    const [ShowComponent, setShowComponent] = useState("addProduct")
    console.log(ShowComponent)
    const hanldeShowComponent = (conp) => {
        setShowComponent(conp)
    }
    return (
        <>
            <div className='row m-0'>
                <Nav cart={props.cart} />
            </div>
            <div className='container'>
                <div className='row m-0'>
                    <div className='col-3 bg-light border border-light rounded shadow-lg mt-5 mb-5'>
                        <div className='row justify-content-center text-black mb-2'>
                            <button className='btn btn-primary' onClick={() => hanldeShowComponent("user")}>User Managerment</button>
                        </div>
                        <div className='row justify-content-center text-black mb-2'>
                            <button className='btn btn-primary' onClick={() => hanldeShowComponent("listProduct")}>List Product</button>
                        </div>
                        <div className='row justify-content-center text-black'>
                            <button className='btn btn-primary' onClick={() => hanldeShowComponent("addProduct")}>Add Product</button>
                        </div>
                    </div>
                    <div className='col-9'>
                        {ShowComponent === "addProduct" ? <AddItem /> : 
                        ShowComponent === "user"? <UserManagerment/>:<ListSP />
                        }
                    </div>

                </div >
            </div>
        </>
    )
}
