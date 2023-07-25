import React, { Component } from 'react'
import CardItem from './cardItem'

export default class productList extends Component {

    render = () => {
        // console.log(this.props.list);
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        {this.props.list.map((card)=>(
                            <div className='col-4 p-2'>
                            <CardItem 
                            item={card} 
                            addToCart={this.props.addToCart}
                            detail={this.props.detail}
                            />
                            </div>
                        ))}
                    </div>
                </div >
            </>
        )
    }

}
