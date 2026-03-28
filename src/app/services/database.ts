import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private sqlite!: SQLiteConnection;
  private db!: SQLiteDBConnection;
  private isNative: boolean = false;
  private webUsers: any[] = []; // fallback para web

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

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT UNIQUE,
        password TEXT
      );
    `);
    console.log('DB lista ✅');
  }

  async getUser(email: string) {
    if (!this.isNative) {
      return this.webUsers.filter(u => u.email === email);
    }
    const res = await this.db.query(`SELECT * FROM usuarios WHERE email = ?`, [email]);
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
}