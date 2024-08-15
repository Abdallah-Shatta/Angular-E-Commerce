import{ Subcategory, Category, Brand } from "./products.model"

export interface Cart {
    _id: string
    cartOwner: string
    products: CartProducts[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
  }
  
  export interface CartProducts {
    count: number
    _id: string
    product: CartProduct
    price: number
  }
  
  export interface CartProduct {
    subcategory: Subcategory[]
    _id: string
    title: string
    quantity: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    id: string
  }
  