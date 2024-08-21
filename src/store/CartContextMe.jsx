import { Children, act, createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: () => { },
    removeItem: () => { },
});

function cartReducer(state, action) {

    if (action.type === 'ADD_ITEM') {
        // Add Item 
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > 0) {
            // update quantity
            const updatedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            // add item
            updatedItems.push({ ...action.item, quantity: 1 });
        }
        return { ...state, items: updatedItems }
    }

    if (action.type === 'REMOVE_ITEM') {
        // remove Item 
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems }
    }


    return state;
}

export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
    }

    return (
        <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
    );
}


export default CartContext; 