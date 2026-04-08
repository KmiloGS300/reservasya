import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AntiAuthGuard } from '../guards/anti-auth-guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AntiAuthGuard] // ✔ aquí sí
  },
  {
    path: 'register',
    component: RegisterComponent
    // ❌ SIN guard
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}