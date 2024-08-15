import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/) ]),
  });

  authSrv = inject(AuthService);
  router = inject(Router);
  errMsg = '';
  isLoading = false;
  onSubmit() {
      if(this.loginForm.valid){
        this.isLoading = true;
        this.authSrv.setLogin(this.loginForm.value).subscribe({
          next: (response) =>{
            this.isLoading = false;
            if(response.message == 'success'){
              localStorage.setItem("uToken", response.token)
              this.router.navigate(['/home']);
            }
          },
          error: (err: HttpErrorResponse) =>{
            this.isLoading = false;
            this.errMsg = err.error.message;
          }
        });
      }else{
        this.loginForm.markAllAsTouched();
      }
    }
}
