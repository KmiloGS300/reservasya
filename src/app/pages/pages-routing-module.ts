import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 🔒 Guards
import { AuthGuard } from '../guards/auth-guard';
import { ReservationGuard } from '../guards/reservation-guard';
import { AdminGuard } from '../guards/admin-guard';

const routes: Routes = [

  // 🏠 HOME (requiere login)
  {
    path: 'home-reservasya',
    loadChildren: () => import('./home-reservasya/home-reservasya.module').then(m => m.HomeReservasyaPageModule),
    canActivate: [AuthGuard]
  },

  // 📅 CALENDAR (inicio del flujo)
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarPageModule),
    canActivate: [AuthGuard]
  },

  // ⏰ TIME SLOTS (requiere fecha)
  {
    path: 'time-slots',
    loadChildren: () => import('./time-slots/time-slots.module').then(m => m.TimeSlotsPageModule),
    canActivate: [AuthGuard, ReservationGuard]
  },

  // 👤 CUSTOMER DATA (requiere fecha + hora)
  {
    path: 'customer-data',
    loadChildren: () => import('./customer-data/customer-data.module').then(m => m.CustomerDataPageModule),
    canActivate: [AuthGuard, ReservationGuard]
  },

  // ✅ CONFIRMATION (requiere todo completo)
  {
    path: 'confirmation',
    loadChildren: () => import('./confirmation/confirmation.module').then(m => m.ConfirmationPageModule),
    canActivate: [AuthGuard, ReservationGuard]
  },

  // 📊 ADMIN
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AuthGuard]
  },

  // 📋 LISTA DE RESERVAS
  {
    path: 'manage-reservations',
    loadChildren: () => import('./manage-reservations/manage-reservations.module').then(m => m.ManageReservationsPageModule),
    canActivate: [AuthGuard]
  },

  // 🔍 DETALLE DE RESERVA
  {
    path: 'reservation-detail',
    loadChildren: () => import('./reservation-detail/reservation-detail.module').then(m => m.ReservationDetailPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule),
    canActivate: [AdminGuard]
  },

  // 🔁 REDIRECCIÓN POR DEFECTO
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