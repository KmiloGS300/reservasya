import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageReservationsPageRoutingModule } from './manage-reservations-routing.module';

import { ManageReservationsPage } from './manage-reservations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageReservationsPageRoutingModule
  ],
  declarations: [ManageReservationsPage]
})
export class ManageReservationsPageModule {}
