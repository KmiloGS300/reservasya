import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CustomerDataPageRoutingModule } from './customer-data-routing.module';
import { CustomerDataPage } from './customer-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDataPageRoutingModule
  ],
  declarations: [CustomerDataPage]
})
export class CustomerDataPageModule {}