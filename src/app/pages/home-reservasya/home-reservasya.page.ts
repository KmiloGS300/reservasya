import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-reservasya',
  templateUrl: './home-reservasya.page.html',
  styleUrls: ['./home-reservasya.page.scss'],
  standalone: false
})
export class HomeReservasyaPage {

  constructor(private router: Router) {}

  irReservar() {
    this.router.navigate(['/calendar']); 
    // 👆 aquí va tu módulo de reservas (calendar, etc)
  }

  irGestionar() {
    this.router.navigate(['/manage-reservations']); 
    // 👆 crea esta ruta luego si no existe
  }
}