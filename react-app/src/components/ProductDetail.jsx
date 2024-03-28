import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";
import './Myprod.css' 
function ProductDetail() {

    const [product, setproduct] = useState()
    const [user, setuser] = useState()
    console.log(user, "userrrrr")
    const p = useParams()

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setproduct(res.data.product)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }, [])


    const handleContact = (addedBy) => {
        console.log('id', addedBy)
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setuser(res.data.user)
                }
            })
            .catch((err) => {
                alert('Server Err.')
            })
    }

    return (<>
        <Header />
        <div className="bgProd">
            {product && <div className="prod">
                <div className="">
                    <img width="450px" height="350px" className="myimgs" src={API_URL + '/' + product.pimage} alt="" />
                    {product.pimage2 && <img width="450px" height="350px" className="myimgs" src={API_URL + '/' + product.pimage2} alt="" />}
                    <h1 className="cntr" > Product Details </h1>
                    <h5  className="cntr">{product.pdesc}</h5>
                    
                    
                </div>
                <div>
                    <h3 className="m-2 price-text"> Rs. {product.price} /- </h3>
                    <p className="m-2"> {product.pname}  | {product.category} </p>

                    {product.addedBy &&
                        <button onClick={() => handleContact(product.addedBy)}>
                            SHOW CONTACT DETAILS
                        </button>}
                    {user && user.username && <h4>{user.username}</h4>}
                    {user && user.mobile && <h3>{user.mobile}</h3>}
                    {user && user.email && <h6>{user.email}</h6>}

                </div>
            </div>}
        </div>
    </>

    )
}

export default ProductDetail;