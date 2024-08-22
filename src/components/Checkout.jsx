import { useContext } from "react";
import useHttp from '../hooks/useHttp'
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from './UI/Input'
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";


const requestConfig = {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
}

export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const userProgressCtx = useContext(UserProgressContext);


    const {data , isLoading: isSending , error , sendRequest} = useHttp('http://localhost:3000/orders' , requestConfig);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }


    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target); 
        const customerData = Object.fromEntries(fd.entries()); 
         
        sendRequest({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        });

        // fetch('http://localhost:3000/orders' , {
        //     method: 'POST',  
        //     headers:{
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         order: {
        //             items: cartCtx.items, 
        //             customer: customerData
        //         }
        //     })
        // })

    }


    let actions = (
        <>
        <Button type="button" textOnly onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
        </>
    );

    if(isSending){
        actions = <span>Sending order data...</span>
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Ceckout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input lable="Full Name" type="text" id="name" />
                <Input lable="E-Mail Address" type="email" id="email" />
                <Input lable="Street" type="text" id="street" />
                <div className="control-row">
                    <Input lable="Postal Code" type="text" id="postal-code" />
                    <Input lable="City" type="text" id="city" />
                </div> 
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    );
} 