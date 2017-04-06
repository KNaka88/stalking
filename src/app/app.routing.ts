import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginPageComponent } from './login-page/login-page.component';

const appRoutes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
