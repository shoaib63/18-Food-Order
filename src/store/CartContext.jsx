import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
});


function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        // ... update the state t oadd a meal item 
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];

        if (existingCartItemIndex > -1) {
            const updateedItem = {
                ...state.items[existingCartItemIndex],
                quantity: state.items[existingCartItemIndex].quantity + 1,
            }
            updatedItems[existingCartItemIndex] = updateedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };

    }

    if (action.type === 'REMOVE_ITEM') {
        // ... reomve an item from the state
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];

        const updatedItems = [...state.items];

        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updateedItem = {
                ...existingCartItem,
                quantity: state.items[existingCartItemIndex].quantity - 1,
            }
            updatedItems[existingCartItemIndex] = updateedItem;
        }

        return { ...state, items: updatedItems }
    }
    return state;
}

export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
    }

    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item });
    }

    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    console.log(cartContext);

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}


export default CartContext;