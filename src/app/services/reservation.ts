import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Reservation {
  id?: number;
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

  private _storage: Storage | null = null;

  private reservation: Reservation = {
    date: '',
    time: '',
    table: null,
    people: 0,
    customerName: '',
    phone: '',
    email: ''
  };

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

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

  // 📤 GET ACTUAL
  getReservation(): Reservation {
    return this.reservation;
  }

  // 💾 GUARDAR EN STORAGE
  async saveReservation(): Promise<boolean> {
    try {

      const reservations = (await this._storage?.get('reservations')) || [];

      const newReservation: Reservation = {
        ...this.reservation,
        id: new Date().getTime() // 🔥 ID único
      };

      reservations.push(newReservation);

      await this._storage?.set('reservations', reservations);

      this.clearReservation();

      return true;

    } catch (err) {
      console.error('Error guardando reserva:', err);
      return false;
    }
  }

  // 📊 OBTENER TODAS
  async getReservations(): Promise<Reservation[]> {
    return (await this._storage?.get('reservations')) || [];
  }

  // 🗑️ ELIMINAR
  async deleteReservation(reserva: Reservation) {
    try {

      let reservations = (await this._storage?.get('reservations')) || [];

      reservations = reservations.filter(
        (r: Reservation) => r.id !== reserva.id
      );

      await this._storage?.set('reservations', reservations);

    } catch (err) {
      console.error('Error eliminando reserva:', err);
    }
  }

  // 🧹 LIMPIAR
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