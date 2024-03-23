import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { productsListReducer, productDetails } from '../reducers/productReducers'
import { cartReducer } from '../reducers/cartReducers'
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducers'
import { profileDetails, profileUpdateDetails, userUpdatePassword } from '../reducers/profilrReducers'
import { orderCreateReducer } from '../reducers/orderReducers'


const reducer = combineReducers({
    productsListReducer: productsListReducer,
    productDetailsReducer: productDetails,
    cartReducerKey: cartReducer,
    userLoginReducer: userLoginReducer,
    userRegisterReducer: userRegisterReducer,
    profileDetailsReducer: profileDetails,
    profileUpdateDetailsReducer: profileUpdateDetails,
    userUpdatePassword: userUpdatePassword,
    orderCreateReducer: orderCreateReducer
})

const isBrowser = typeof window !== "undefined";

const cartItemsFromStorage =
	isBrowser && localStorage.getItem("cartItemsStorage")
		? JSON.parse(localStorage.getItem("cartItemsStorage"))
		: [];

const userInfoFromStorage =
	isBrowser && localStorage.getItem("userInfoStorage")
		? JSON.parse(localStorage.getItem("userInfoStorage"))
		: null;

const cartShippingData =
	isBrowser && localStorage.getItem("shippingData")
		? JSON.parse(localStorage.getItem("shippingData"))
		: {};

// when pull the data to use in website
const initialState = {
    cartReducerKey: {cartItems: cartItemsFromStorage, shippingData: cartShippingData},
    userLoginReducer: {userInfo: userInfoFromStorage},
    
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store