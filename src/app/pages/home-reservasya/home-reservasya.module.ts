import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HomeReservasyaPageRoutingModule } from './home-reservasya-routing.module';
import { HomeReservasyaPage } from './home-reservasya.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeReservasyaPageRoutingModule
  ],
  declarations: [HomeReservasyaPage]
})
export class HomeReservasyaPageModule {}
