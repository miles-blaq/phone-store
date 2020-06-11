import React from 'react'
import CartItem from './CartItem'

const CartLIst = ({value}) => {
    const {cart} = value;
    const allItems = cart.map(i => <CartItem key={i.id} item={i} value={value}/>)
    return (
        <div className="container-fluid">
            {allItems}
        </div>
    )
}

export default CartLIst
