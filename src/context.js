import React, { Component } from 'react'
import {storeProducts,detailProduct} from "./data"

const ProductContext = React.createContext();

class ProductProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             products:[],
             detailProduct,
             cart:[],
             modalOpen:false,
             modalProduct:detailProduct,
             cartSubtotal:0,
             cartTax:0,
             cartTotal:0
        }
    }
    componentDidMount(){
        this.setProducts();
    }
    // fixing object refernce issue,
    //copying the values to product instead of having them both point to the same object
    setProducts  = ()=>{
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item };
            tempProducts = [...tempProducts,singleItem]
        })
        this.setState(()=>{
            return {products:tempProducts}
        })
    }
    // get item by id
    getItem = (id)=>{
        return this.state.products.find(item=> item.id === id) 
    }
    handleDetail = (id)=>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {detailProduct:product}
        })
    }
    addToCart = (id)=>{
        //using index to make changes to the item
       let tempProducts = [...this.state.products];
       const index = tempProducts.indexOf(this.getItem(id));
       const product = tempProducts[index];
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price; //will be used to add total price

       this.setState(()=>{
           return {
               products: tempProducts,
               cart:[...this.state.cart,product]
           }
       },()=>{this.addTotals()})

    }
    openModal = id =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return {
                modalOpen:true,
                modalProduct:product
            }
        })
    }
    closeModal = () =>{
       this.setState(()=>{
           return {modalOpen:false}
       })
    }
    increment = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id);
        //
        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index]
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return{
                cart:[...tempCart]
            }
        },()=>{this.addTotals()})
    }
    decrement = (id)=>{
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id === id);
        //
        const index = tempCart.indexOf(selectedProduct);
        let product = tempCart[index]
        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id)
        }else{
            product.total = product.count * product.price;
            this.setState(()=>{
                return{
                    cart:[...tempCart]
                }
            },()=>{this.addTotals()})
        }
    }
    removeItem = (id)=>{
       let tempProducts = [...this.state.products]
       let tempCart = [...this.state.cart]

       tempCart = tempCart.filter(item=> item.id !== id)
       //find removed product to make changes to it
       const index = tempProducts.indexOf(this.getItem(id));
       let removedProduct = tempProducts[index]
       removedProduct.inCart=false;
       removedProduct.count=0;
       removedProduct.total = 0;
       this.setState(()=>{
           return{
               cart:[...tempCart],
               product:[...tempProducts]
           }
       },()=>{this.addTotals()})

    }
    clearCart = ()=>{
        this.setState(()=>{
            return{cart:[]}
        },()=>{
            this.setProducts();
            this.addTotals();
        })
    }
    addTotals = ()=>{
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const TempTax = subTotal * 0.1;
        const tax = parseFloat(TempTax.toFixed(2));
        const total = subTotal + tax;
        this.setState(()=>{
            return{
                cartSubtotal:subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }
    render() {
        // const {products,detailProduct} = this.state
        return (
            <ProductContext.Provider value={{...this.state,
            handleDetail:this.handleDetail,
            addToCart:this.addToCart,
            openModal:this.openModal,
            closeModal:this.closeModal,
            increment:this.increment,
            decrement:this.decrement,
            removeItem:this.removeItem,
            clearCart:this.clearCart}}>
                {/* return all children, since the whole app will be wrapped in this */}
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider,ProductConsumer}