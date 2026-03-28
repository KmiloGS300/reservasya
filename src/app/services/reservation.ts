import { Injectable } from '@angular/core';

export interface Reservation {
  date: string;
  time: string;
  table: any;
  people: number;
  customerName: string;
  phone: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservation: Reservation = {
    date: '',
    time: '',
    table: null,
    people: 0,
    customerName: '',
    phone: '',
    email: ''
  };

  constructor() {}

  // 🧱 SETTERS
  setDate(date: string) {
    this.reservation.date = date;
  }

  setTime(time: string) {
    this.reservation.time = time;
  }

  setTable(table: any) {
    this.reservation.table = table;
  }

  setCustomerData(name: string, people: number, phone: string, email: string) {
    this.reservation.customerName = name;
    this.reservation.people = people;
    this.reservation.phone = phone;
    this.reservation.email = email;
  }

  // 📤 GET
  getReservation(): Reservation {
    return this.reservation;
  }

  // 💾 SAVE
  saveReservation() {
    let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

    reservations.push({ ...this.reservation });

    localStorage.setItem('reservations', JSON.stringify(reservations));

    return Promise.resolve(true);
  }

  // 📊 ADMIN
  getReservations(): Reservation[] {
    return JSON.parse(localStorage.getItem('reservations') || '[]');
  }

  // 🧹 CLEAR
  clearReservation() {
    this.reservation = {
      date: '',
      time: '',
      table: null,
      people: 0,
      customerName: '',
      phone: '',
      email: ''
    };
  }
}