import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../testProduct/addItem.module.css"
export default function AddItem(props) {

    const UpdateProduct = props.UpdateProduct;
    const [product, setProduct] = useState({
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
    })

    //delete product
    const deleteProduct = () => {
        setProduct({
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
        props.setUpdateProduct({
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
        setPreviewImage('')
    }

    useEffect(() => {
        if (props.UpdateProduct.idProduct) {
            setProduct({
                idProduct: props.UpdateProduct.idProduct,
                productName: props.UpdateProduct.productName,
                img: props.UpdateProduct.img,
                category: props.UpdateProduct.category,
                loaiMay: props.UpdateProduct.loaiMay,
                kinh: props.UpdateProduct.kinh,
                kieuDang: props.UpdateProduct.kieuDang,
                duongKinh: props.UpdateProduct.duongKinh,
                chatLieuVo: props.UpdateProduct.chatLieuVo,
                chatLieuDay: props.UpdateProduct.chatLieuDay,
                baoHanh: props.UpdateProduct.baoHanh,
                quantity: props.UpdateProduct.quantity,
                price: props.UpdateProduct.price,
            })
            console.log(product)
            const previewURL = `http://localhost:8080/api/product/get-image/${props.UpdateProduct.img}`;
            setPreviewImage(previewURL)
            setSelectedFile(props.UpdateProduct.img)
            // console.log(selectedFile)
        } else {
            console.log("first")
        }
    }, [props.UpdateProduct])

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // setProduct({ ...product, img: file });
        setSelectedFile(file);
        console.log(selectedFile);
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
        formData.append('idProduct', product.idProduct);
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

        if (product.idProduct) {
            console.log(formData, "update")
        } else {
            console.log("add")
        }
        if (product.idProduct) {
            axios.post(`http://localhost:8080/api/product/update/${product.idProduct}`, formData).then((response) => {
                console.log("update products successfully", response.data);
                deleteProduct()
            }).catch((error) => {
                console.log(error)
            });
        } else {
            axios
                .post("http://localhost:8080/api/product/add", formData)
                .then((response) => {
                    console.log("add products successfully", response.data);
                    // setProduct({
                    //     productName: "",
                    //     img: "",
                    //     category: "",
                    //     loaiMay: "",
                    //     kinh: "",
                    //     kieuDang: "",
                    //     duongKinh: "",
                    //     chatLieuVo: "",
                    //     chatLieuDay: "",
                    //     baoHanh: "",
                    //     quantity: "",
                    //     price: "",
                    // });
                    deleteProduct()

                })
                .catch((error) => {
                    console.log("error: " + error);
                });
        }

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
                            <label class="col-3 col-form-label d-flex justity-content-start">Tên sản phẩm</label>
                            <input class="col form-control" type="text" placeholder="Name" name='productName' value={product.productName} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Danh mục</label>
                            <input class="col form-control" placeholder="category" name='category' value={product.category} onChange={handleChange}></input></div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Loại máy</label>
                            <input class="col form-control" placeholder="loaiMay" name='loaiMay' value={product.loaiMay} onChange={handleChange}></input></div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Kính</label>
                            <input class="col form-control" placeholder="kinh" name='kinh' value={product.kinh} onChange={handleChange}></input></div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Kiểu dáng</label>
                            <input class="col form-control" placeholder="kieuDang" name='kieuDang' value={product.kieuDang} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Đường kính</label>
                            <input class="col form-control" placeholder="duongKinh" name='duongKinh' value={product.duongKinh} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Chất liệu vỏ</label>
                            <input class="col form-control" placeholder="chatLieuVo" name='chatLieuVo' value={product.chatLieuVo} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Chất liệu dây</label>
                            <input class="col form-control" placeholder="chatLieuDay" name='chatLieuDay' value={product.chatLieuDay} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Bảo hành</label>
                            <input class="col form-control" placeholder="baoHanh" name='baoHanh' value={product.baoHanh} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Số lượng</label>
                            <input class="col form-control" placeholder="quantity" name='quantity' value={product.quantity} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Thành tiền</label>
                            <input class="col form-control" placeholder="price" name='price' value={product.price} onChange={handleChange}></input>
                        </div>
                        <div class=" d-flex mb-2">
                            <label class="col-3 col-form-label d-flex justity-content-start">Hình ảnh</label>
                            <input type='file' class="col form-control" placeholder="img" name='img' onChange={handleFileChange}></input>
                        </div>
                        {previewImage ? (
                            <div class=" d-flex mb-2 justify-content-center">
                                {previewImage && <img src={previewImage} alt="Preview" style={{ width: '200px', height: '200px' }} />}
                            </div>
                        ) : <></>}
                        <div class="row d-flex mb-2 justify-content-center" >
                            <button class="col-3 btn btn-danger" type='submit' onClick={handleUpload}>submit</button>
                            <button class="col-3 btn btn-info" type='button' onClick={deleteProduct}>cancel</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
