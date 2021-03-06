import React from 'react'
import {ProductConsumer} from "../context"
import {Link} from "react-router-dom";
import {ButtonContainer} from "./Button"
const Details = () => {
    return (
        <ProductConsumer>
            {(value)=>{
                const {id,company,img,info,price,title,inCart} = value.detailProduct;
                return (
                    <div className="container py-5">
                        {/* title */}
                        <div className="row">
                            <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                <h1>{title}</h1>
                            </div>
                        </div>
                        {/* product info */}
                        <div className="row">
                            <div className="col-10 mx-auto col-md-6 my-3">
                                <img src={img} alt="product" className="img-fluid"/>
                            </div>
                            <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                                 <h3>model:{title}</h3>
                                 <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                     made by : <span className="text-uppercase">{company}</span>
                                 </h4>
                                 <h4 className="text-blue">
                                    <strong>price: <span>$</span>{price}</strong>
                                 </h4>
                                <p className="text-capitalize font-weight-bold mt-3 mb-0">product information</p>
                                 <p className="text-muted lead">{info}</p>
                             {/* cart buttons */}
                             <div>
                                 <Link to="/"><ButtonContainer>Back To Products</ButtonContainer></Link>
                                 {/* cart  */}
                                 <ButtonContainer disabled={inCart?true:false} onClick={()=>{
                                     value.addToCart(id);
                                     value.openModal(id);}} 
                                    cartColor >
                                     {inCart ? "incart":"add to cart"}
                                 </ButtonContainer>
                             </div>
                            </div>
                        </div>
                    </div>
                )
            }}
        </ProductConsumer>
    )
}

export default Details
