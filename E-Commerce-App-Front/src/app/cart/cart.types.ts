export interface CartResponse{
    Id:number,
    TotalPrice:number,
    CartItems:[
        {
            Quantity:number,
            Price:number,
            Product:{
                Id:number,
                Name:string,
                Price:number,
                Description:string,
                ImageUrl:string
            }
            CartId:number,
            ProductId:number

        }
    ],
    UserId:string
};