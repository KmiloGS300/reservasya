import { Injectable } from '@angular/core';
import { DatabaseService } from './database'; // 🔥 IMPORTANTE

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

  constructor(private dbService: DatabaseService) {} // 🔥 INYECCIÓN

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

  // 💾 SAVE en SQLite
  async saveReservation(): Promise<boolean> {
    try {
      await this.dbService.initDB();

      // Crear tabla si no existe
      await this.dbService.db.execute(`
        CREATE TABLE IF NOT EXISTS reservas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          date TEXT,
          time TEXT,
          tableNumber TEXT,
          people INTEGER,
          customerName TEXT,
          phone TEXT,
          email TEXT
        );
      `);

      await this.dbService.db.run(
        `INSERT INTO reservas (date, time, tableNumber, people, customerName, phone, email)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          this.reservation.date,
          this.reservation.time,
          JSON.stringify(this.reservation.table), // 👈 por si es objeto
          this.reservation.people,
          this.reservation.customerName,
          this.reservation.phone,
          this.reservation.email
        ]
      );

      this.clearReservation();
      return true;

    } catch (err) {
      console.error('Error guardando reserva:', err);
      return false;
    }
  }

  // 📊 OBTENER RESERVAS
  async getReservations(): Promise<Reservation[]> {
    try {
      await this.dbService.initDB();

      const res = await this.dbService.db.query(`SELECT * FROM reservas`);

      return (res.values || []).map((r: any) => ({
        ...r,
        table: JSON.parse(r.tableNumber || 'null')
      }));

    } catch (err) {
      console.error('Error obteniendo reservas:', err);
      return [];
    }
  }

  // 🗑️ DELETE
  async deleteReservation(reserva: any) {
    try {
      await this.dbService.initDB();

      await this.dbService.db.run(
        `DELETE FROM reservas WHERE email = ? AND date = ? AND time = ?`,
        [reserva.email, reserva.date, reserva.time]
      );

    } catch (err) {
      console.error('Error eliminando reserva:', err);
    }
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