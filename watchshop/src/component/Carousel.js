import React, { Component } from 'react'

export default class Carousel extends Component {
    render() {
        return (
            <div class="row mt-3">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" >
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img class="d-block w-100" src="https://watchshop.com.vn/wp-content/uploads/2023/03/83_2400x960-3-1200x480.png" alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="https://watchshop.com.vn/wp-content/uploads/2018/10/WATCHSHOP-KAYPAY-600x240.png" alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                            <img class="d-block w-100" src="https://watchshop.com.vn/wp-content/uploads/2022/12/WATCHSHOP-QR-600x240.png" alt="Third slide"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }

}
