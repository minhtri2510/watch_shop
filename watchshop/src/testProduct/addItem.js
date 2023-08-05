import React, { useState } from 'react'
import axios from 'axios';
import "../testProduct/addItem.module.css"
export default function AddItem() {

    const [product, setProduct] = useState({
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
    })

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // setProduct({ ...product, img: file });
        setSelectedFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
            setProduct({
                ...product,
                img: reader.result // Lưu dữ liệu hình ảnh dưới dạng base64 vào trường img của đối tượng product
              });
        };
        reader.readAsDataURL(file);
    };

    const handleUpload = () => {
        if (!selectedFile) {
            alert("Vui lòng chọn hình ảnh trước khi tải lên.");
            return;
        }
    }
    const handleChange = (event) => {

        const { name, value } = event.target;

        setProduct((prevState) => ({

            ...prevState,

            [name]: value,

        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Vui lòng chọn hình ảnh trước khi tải lên.");
            return;
        }
        const formData = new FormData();
        formData.append('productName', product.productName);
        formData.append('category', product.category);
        formData.append('loaiMay', product.loaiMay);
        formData.append('kinh', product.kinh);
        formData.append('kieuDang', product.kieuDang);
        formData.append('duongKinh', product.duongKinh);
        formData.append('chatLieuVo', product.chatLieuVo);
        formData.append('chatLieuDay', product.chatLieuDay);
        formData.append('baoHanh', product.baoHanh);
        formData.append('quantity', product.quantity);
        formData.append('price', product.price);
        formData.append('imgFile', selectedFile);

        // console.log(product);
        axios
            .post("http://localhost:8080/api/product/add", formData)
            .then((response) => {
                console.log("add products successfully", response.data);
                setProduct({
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
            })
            .catch((error) => {
                console.log("error: " + error);
            });
    };

    return (
        <div class="container">

            <div className=' d-flex flex-column bg-primary p-3 mt-5 mb-5 border border-info rounded shadow-lg mb-5 bg-white rounded'>
                <div className='row pb-3'>
                    <h1>Create Product</h1>
                </div>
                <div className='row'>
                    <form onSubmit={handleSubmit}>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">name</label>
                            <input class="col form-control" type="text" placeholder="ame" name='productName' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">category</label>
                            <input class="col form-control" placeholder="category" name='category' onChange={handleChange}></input></div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">loaimay</label>
                            <input class="col form-control" placeholder="loaiMay" name='loaiMay' onChange={handleChange}></input></div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">kính</label>
                            <input class="col form-control" placeholder="kinh" name='kinh' onChange={handleChange}></input></div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">kieu dang</label>
                            <input class="col form-control" placeholder="kieuDang" name='kieuDang' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">duong kinh</label>
                            <input class="col form-control" placeholder="duongKinh" name='duongKinh' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">chat lieu vo</label>
                            <input class="col form-control" placeholder="chatLieuVo" name='chatLieuVo' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">chat lieu day</label>
                            <input class="col form-control" placeholder="chatLieuDay" name='chatLieuDay' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">dao hanh</label>
                            <input class="col form-control" placeholder="baoHanh" name='baoHanh' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">quantity</label>
                            <input class="col form-control" placeholder="quantity" name='quantity' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">price</label>
                            <input class="col form-control" placeholder="price" name='price' onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">img</label>
                            <input type='file' class="col form-control" placeholder="img" name='img' onChange={handleFileChange}></input>
                        </div>
                        <div class=" d-flex mb-2 justify-content-center">
                            {previewImage && <img src={previewImage} alt="Preview" style={{ width: '200px', height: '200px' }} />}
                        </div>
                        <div class="row d-flex mb-2 justify-content-center" >
                            <button class="col-3 btn btn-danger" type='submit' onClick={handleUpload}>submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
