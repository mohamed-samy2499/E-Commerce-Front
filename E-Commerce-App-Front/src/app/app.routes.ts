import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AdminGuard } from './Shared/guards/admin.guard';
import { AuthGuard } from './Shared/guards/auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart/cart.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            { path: 'products', component: ProductListComponent },
            { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: '/products', pathMatch: 'full' },
            { path: '**', redirectTo: '/products' }
        ]
    }
];
