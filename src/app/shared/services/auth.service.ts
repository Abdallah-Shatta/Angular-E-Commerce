import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginData, UserData } from '../models/userdata.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  baseURL = "https://ecommerce.routemisr.com";
  
  setRegister(userData: UserData):Observable<any>{
    return this.http.post(`${this.baseURL}/api/v1/auth/signup`, userData);
  }

  setLogin(userData: LoginData):Observable<any>{
    return this.http.post(`${this.baseURL}/api/v1/auth/signin`, userData);
  }

  toLogOut(){
    localStorage.removeItem("uToken");
    this.router.navigate(["/login"]);
  }

}
