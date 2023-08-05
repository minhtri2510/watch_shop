import React, { Component } from 'react'
import '../css/footer.module.css'

export default class footer extends Component {
    render() {
        return (
            <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-md-4">
                            <h4>Contact Information</h4>
                            <p>Email: contact@example.com</p>
                            <p>Phone: +1 123-456-7890</p>
                            <p>Address: 123 Street, City, Country</p>
                        </div>
                        <div class="col-md-4">
                            <h4>Follow Us</h4>
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                        </div>
                        <div class="col-md-4">
                            <h4>About Us</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
