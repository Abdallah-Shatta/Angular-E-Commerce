import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Category, Product } from '../../shared/models/products.model';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { TrimtextPipe } from '../../shared/pipes/trimtext.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from "../../shared/pipes/search.pipe";
import { CartService } from '../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CarouselModule, CurrencyPipe, TrimtextPipe, FormsModule, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(private productsSrv: ProductsService, private cartSrv: CartService, private toaster: ToastrService){}

  allProducts: Product[] = [];
  allCategories: Category[] = [];
  searchedProduct: string = '';

  ngOnInit(): void {
    this.productsSrv.getAllProducts().subscribe({
      next: (response)=>{
        this.allProducts = response.data;
      }
    });

    this.productsSrv.getAllCategories().subscribe({
      next:(response)=>{
        this.allCategories = response.data;
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
  
  mainSliderOptions: OwlOptions = {
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

  categoriesSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
}
