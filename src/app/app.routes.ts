
import {Routes} from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';

import { authGuard } from './auth/auth.guard';
import { CostumerComponent } from './pages/costumer/costumer.component';
import { DetailComponent } from './pages/costumer/detail/detail.component';

export const routes: Routes = [
   
    {
      path: '', 
      redirectTo: '/login', 
      pathMatch: 'full'
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'signup', 
        component: SignupComponent
    },

    {
      path: 'costumer', 
      title: 'Clientes',
      component: CostumerComponent, 
      canActivate: [authGuard]
    },
    {
      path: 'costumer/detail/:id', 
      title: 'Detalhes do cliente',
      component: DetailComponent, 
      canActivate: [authGuard]
    },
    
  ];


