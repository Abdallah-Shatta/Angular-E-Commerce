import { Component, inject } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [ Validators.required, Validators.minLength(3), Validators.maxLength(20) ]),
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/) ]),
    rePassword: new FormControl(''),
    phone: new FormControl('', [ Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/) ])
  }, { validators: [ this.confirmPassword ] } as FormControlOptions);

  confirmPassword(group: FormGroup){
    const password = group.get("password");
    const rePassword = group.get("rePassword");
    if(rePassword?.value == ''){
      rePassword.setErrors({ required: true })
    }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors({ mismatch: true });
    }
  }

  authSrv = inject(AuthService);
  router = inject(Router);
  errMsg = '';
  isLoading = false;
  onSubmit() {
      if(this.registerForm.valid){
        this.isLoading = true;
        this.authSrv.setRegister(this.registerForm.value).subscribe({
          next: (response) =>{
            this.isLoading = false;
            if(response.message == 'success'){
              this.router.navigate(['/login']);
            }
          },
          error: (err: HttpErrorResponse) =>{
            this.isLoading = false;
            this.errMsg = err.error.message;
          }
        });
      }else{
        this.registerForm.markAllAsTouched();
      }
    }
}
