import CartContext from "../store/CartContext";
import Modal from "./UI/Modal";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";


export default function Cart() {

    const cartCtx = useContext(CartContext);
    const userProgressContext = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)


    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleShowCheckout() {
        userProgressContext.showCheckout();
    }

    return <Modal className="cart" open={userProgressContext.progress === 'cart'} onClose={handleCloseCart}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map(item =>
                <CartItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                />)}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {cartCtx.items.length > 0 && (<Button onClick={handleShowCheckout}>Go to Checkout</Button>)}
        </p>
    </Modal>
}  