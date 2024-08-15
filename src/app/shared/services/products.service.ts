import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http = inject(HttpClient);
  router = inject(Router);
  baseURL = "https://ecommerce.routemisr.com";

  getAllProducts(): Observable<any>{
    return this.http.get(`${this.baseURL}/api/v1/products`);
  }

  getProductDetails(id: string):Observable<any>{
    return this.http.get(`${this.baseURL}/api/v1/products/${id}`)
  }

  getAllCategories():Observable<any>{
    return this.http.get(`${this.baseURL}/api/v1/categories`);
  }
}