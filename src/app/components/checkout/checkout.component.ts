import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private cartSrv: CartService){}
  
  cartId: any = '';

  chechoutGroup!: FormGroup ;
  ngOnInit(): void {
    this.chechoutGroup = this.formBuilder.group({
      details: [''],
      phone: [''],
      city: ['']
    });
    this.activatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId = params.get("id");
      }
    })
  }

  handleForm() {
    this.cartSrv.checkOut(this.cartId, this.chechoutGroup.value).subscribe({
      next: (response)=>{
        if(response.status == 'success'){
          window.open(response.session.url, '_self');
        }
      }
    })
    }
}
