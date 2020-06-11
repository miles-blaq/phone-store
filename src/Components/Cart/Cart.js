import React, { Component } from 'react'
import Title from "../Title";
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import {ProductConsumer} from "../../context"
import CartLIst from './CartLIst';
import CartTotals from './CartTotals';

class Cart extends Component {
    render() {
        return (
           <section>
               <ProductConsumer>
                   {value => {
                       const {cart} = value;
                       if(cart.length > 0){
                           return (
                               <React.Fragment>
                                    <Title name="your " title="cart"/>
                                     <CartColumns/>
                                     <CartLIst value={value}/>
                                     <CartTotals value={value}/>
                               </React.Fragment>
                           );
                       }else{
                           return  <EmptyCart/>
                       }
                   }}
               </ProductConsumer>
           </section>
        )
    }
}

export default Cart
