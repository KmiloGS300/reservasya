import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeReservasyaPage } from './home-reservasya.page';

const routes: Routes = [
  {
    path: '',
    component: HomeReservasyaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeReservasyaPageRoutingModule {}
