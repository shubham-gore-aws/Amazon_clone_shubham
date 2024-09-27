import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    addCart: [],
    totalItems: 0,
    totalPrice: 0,
    favorites: [],
    checkitem1:[],
    searchTerm: '',
    createacc: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartFun: (state, action) => {
            const existingItem = state.addCart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.addCart.push({ ...action.payload, quantity: 1 });
             console.log(action.payload)
            }

            state.totalItems += 1;
            state.totalPrice += action.payload.price;
        },
        toggleFavorite: (state, action) => {
            const product = action.payload;
            const existingItem = state.favorites.find(item => item.id === product.id);
            if (existingItem) {
                state.favorites = state.favorites.filter(item => item.id !== product.id);
            } else {
                state.favorites.push({ id: product.id, description: product.description, price: product.price, thumbnail: product.thumbnail , images: product.images     });
            }
        },
        removeCartFun: (state, action) => {
            const index = state.addCart.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.totalItems -= state.addCart[index].quantity;
                state.totalPrice -= state.addCart[index].price * state.addCart[index].quantity;
                state.addCart.splice(index, 1);
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.addCart.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
                state.totalItems += 1;
                state.totalPrice += item.price;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.addCart.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                state.totalItems -= 1;
                state.totalPrice -= item.price;
            }
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload; // Set the search term
        },
        // Filtering logic based on the searchTerm
        filterCartItems: (state) => {
            if (state.searchTerm) {
                state.addCart = state.addCart.filter(item =>
                    item.title.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            }
        },

        checkitemfun:(state,action) => {
            console.log(action.payload)
            state.checkitem1=[...action.payload]
        },
        Createaccountobj: (state, action) => {
            state.createacc.push(action.payload); // Add the account details to the `createacc` array
            console.log(action.payload);
        }
    },
});

// Export actions
export const { addCartFun, toggleFavorite, removeCartFun, incrementQuantity, decrementQuantity, Createaccountobj, checkitemfun, setSearchTerm } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
