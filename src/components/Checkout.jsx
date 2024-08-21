import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from './UI/Input'
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";


export default function Checkout() {

    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const userProgressCtx = useContext(UserProgressContext);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form>
                <h2>Ceckout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input lable="Full Name" type="text" id="full-name" />
                <Input lable="E-Mail Address" type="email" id="email" />
                <Input lable="Street" type="text" id="street" />
                <div className="control-row">
                    <Input lable="Postal Code" type="text" id="postal-code" />
                    <Input lable="City" type="text" id="city" />
                </div>
                <p className="modal-actions">
                    <Button type="button" textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
} 