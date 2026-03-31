import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite!: SQLiteConnection;
  public db!: SQLiteDBConnection;
  private isNative: boolean = false;

  private webUsers: any[] = [];
  private webReservations: any[] = [];

  constructor() {
    this.isNative = Capacitor.isNativePlatform();
    if (this.isNative) {
      this.sqlite = new SQLiteConnection(CapacitorSQLite);
    }
  }

  async initDB() {
    if (!this.isNative) {
      console.log('Modo web: DB en memoria');
      return;
    }

    this.db = await this.sqlite.createConnection(
      'usuariosDB',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    // 👤 USUARIOS
    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);

    // 📅 RESERVAS
    await this.db.execute(`
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

    console.log('DB lista con usuarios y reservas ✅');
  }

  // =========================
  // 👤 USUARIOS
  // =========================

  async getUser(email: string) {
    if (!this.isNative) {
      return this.webUsers.filter(u => u.email === email);
    }

    const res = await this.db.query(
      `SELECT * FROM usuarios WHERE email = ?`,
      [email]
    );

    return res.values || [];
  }

  async addUser(nombre: string, email: string, password: string) {
    if (!this.isNative) {
      this.webUsers.push({ nombre, email, password });
      return;
    }

    await this.db.run(
      `INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`,
      [nombre, email, password]
    );
  }

  // =========================
  // 📅 RESERVAS
  // =========================

  async addReservation(reserva: any) {
    if (!this.isNative) {
      this.webReservations.push(reserva);
      return;
    }

    await this.db.run(
      `INSERT INTO reservas (date, time, tableNumber, people, customerName, phone, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        reserva.date,
        reserva.time,
        JSON.stringify(reserva.table),
        reserva.people,
        reserva.customerName,
        reserva.phone,
        reserva.email
      ]
    );
  }

  async getReservations() {
    if (!this.isNative) {
      return this.webReservations;
    }

    const res = await this.db.query(`SELECT * FROM reservas`);

    return (res.values || []).map((r: any) => ({
      ...r,
      table: JSON.parse(r.tableNumber || 'null')
    }));
  }

  async deleteReservation(reserva: any) {
    if (!this.isNative) {
      this.webReservations = this.webReservations.filter(r =>
        !(r.email === reserva.email && r.date === reserva.date && r.time === reserva.time)
      );
      return;
    }

    await this.db.run(
      `DELETE FROM reservas WHERE email = ? AND date = ? AND time = ?`,
      [reserva.email, reserva.date, reserva.time]
    );
  }
}