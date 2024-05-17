export const Constants ={
    API_END_POINT:'http://ecommerceapis.runasp.net',
    //API_END_POINT:'https://localhost:7055',
    METHODS: {
        LOGIN:'/Auth/login',
        REGISTER:'/Auth/register',
        GET_ALL_PRODUCTS:'/Products',
        CREATE_PRODUCT:'/Products',
        EDIT_PRODUCT:'/Products',
        DELETE_PRODUCT:'/Products',
        ADD_PRODUCT_TO_CART:'/Products/addProductToCart',


        GET_CURRENT_CART_INFO:'/Carts/CurrentCartInfo',
        GET_CART_BY_ID:'/Carts',
        EDIT_CART:'/Carts',
        DELETE_CART:'/Carts',
        ADD_CART_ITEM:'/Carts/IncreaseItem',
        REMOVE_CART_ITEM:'/Carts/RemoveItem',
        DELETE_CART_ITEM:'/Carts/DeleteCartItem'

    }
}