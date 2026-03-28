import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarPageModule)
  },
  {
    path: 'time-slots',
    loadChildren: () => import('./time-slots/time-slots.module').then(m => m.TimeSlotsPageModule)
  },
  {
    path: 'customer-data',
    loadChildren: () => import('./customer-data/customer-data.module').then(m => m.CustomerDataPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then(m => m.ConfirmationPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: '',
    redirectTo: 'calendar',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}