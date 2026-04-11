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
        id: new Date().getTime()
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

  // 📊 OBTENER TODAS (🔥 AQUÍ VA EL SEED)
  async getReservations(): Promise<Reservation[]> {

    let reservations = (await this._storage?.get('reservations')) || [];

    // 🔥 SI NO HAY RESERVAS → CREAR DATOS DE PRUEBA
    if (!reservations || reservations.length === 0) {

      reservations = this.generateSeedReservations();

      await this._storage?.set('reservations', reservations);

      console.log('🌱 Seed de reservas generado');
    }

    return reservations;
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

  // 🌱 GENERADOR DE RESERVAS (NO AFECTA NADA EXISTENTE)
  private generateSeedReservations(): Reservation[] {

    const names = [
      'Juan Pérez', 'María Gómez', 'Carlos Ramírez', 'Laura Sánchez',
      'Andrés Torres', 'Camila Ríos', 'Daniel Castro', 'Valentina López'
    ];

    const emails = [
      'juanp@gmail.com', 'maria@hotmail.com', 'carlos@yahoo.com',
      'laura@outlook.com', 'andres@gmail.com', 'camila@hotmail.com',
      'daniel@yahoo.com', 'valentina@outlook.com'
    ];

    const times = [
      '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
      '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
    ];

    const today = new Date();

    return names.map((name, i) => {

      const date = new Date();
      date.setDate(today.getDate() + (i % 3)); // hoy + próximos días

      return {
        id: Date.now() + i,
        date: date.toISOString().split('T')[0],
        time: times[i], // 🔥 SIN REPETIR HORAS
        table: null,
        people: Math.floor(Math.random() * 5) + 1,
        customerName: name,
        phone: '3' + Math.floor(100000000 + Math.random() * 900000000),
        email: emails[i]
      };
    });
  }
}