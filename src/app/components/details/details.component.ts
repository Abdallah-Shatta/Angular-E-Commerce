import { Product } from './../../shared/models/products.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  constructor(private activeRouter: ActivatedRoute, 
    private productsSrv: ProductsService, 
    private cartSrv: CartService, 
    private toaster: ToastrService){}
  
  productDetails: Product = {} as Product

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe({
      next:(params)=>{
        let productId: any = params.get("id");
        this.productsSrv.getProductDetails(productId).subscribe({
          next:(response)=>{
            this.productDetails = response.data;
          }
        })
      }
    })
  }

  addProductToCart(id: string){
    this.cartSrv.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this.toaster.success(response.message);
      }
    });
  }

  productSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    items: 1,
    nav: false
  }
}
