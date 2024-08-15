import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';

export const routes: Routes = [
    { path: '', canActivate: [authGuard], component: BlankLayoutComponent,
        children:
        [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'details/:id', component: DetailsComponent },
            { path: 'cart', component: CartComponent },
            { path: 'checkout/:id', component: CheckoutComponent },
            { path: 'allorders', component: AllordersComponent }
        ]},

    { path: '', component: AuthLayoutComponent, 
        children: 
        [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]},
        
    { path: '**', component: NotfoundComponent }
    ];
