import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class listCategory extends Component {
  render() {
    return (
      <div className='d-flex justify-content-evenly'>
        <Link to={"/"}>
          <button className='btn btn-dark' onClick={() => this.props.handleCategory(true)}>All</button>
        </Link>
        <Link to={"/"}>
          <button className='btn btn-light' onClick={() => this.props.handleCategory("TISSOT")}>TISSOT</button>
        </Link>
        <Link to={"/"}>
          <button className='btn btn-light ' onClick={() => this.props.handleCategory("Victorinox")}>Victorinox</button>
        </Link>
        <Link to={"/"}>
          <button className='btn btn-light' onClick={() => this.props.handleCategory("Bentley")}>Bentley</button>
        </Link>
        <Link to={"/"}>
          <button className='btn btn-light' onClick={() => this.props.handleCategory("Wenger")}>Wenger</button>
        </Link>
        <Link to={"/"}>
          <button className='btn btn-light' onClick={() => this.props.handleCategory("Casio")}>Casio</button>
        </Link>
      </div>
    )
  }
}
