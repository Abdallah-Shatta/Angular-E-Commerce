import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient);
  baseURL = "https://ecommerce.routemisr.com/api/v1/cart";
  uToken: any = localStorage.getItem("uToken");
  addToCart(id : string):Observable<any>{
    return this.http.post(this.baseURL,
      { productId: id },
      { headers: { token: this.uToken } }
    );
  }

  getUserCart():Observable<any>{
    return this.http.get(this.baseURL,
    { headers: { token: this.uToken } }
    );
  }

  removeItem(id: string): Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`,
    { headers: { token: this.uToken } }
    );
  }

  updateProductCount(id: string, newCount: number):Observable<any>{
    return this.http.put(`${this.baseURL}/${id}`,
      { count: newCount },
      { headers: { token: this.uToken } }
    );
  }

  checkOut(cartId: string, userAddress: any): Observable<any>{
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://abdallah-shatta.github.io/Angular-E-Commerce/`,
      { shippingAddress: userAddress },
      { headers: { token: this.uToken } }
    );
  }
}
