import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async register(nombre: string, email: string, password: string): Promise<boolean> {

    const users = (await this._storage?.get('users')) || [];

    const exists = users.find((u: any) => u.email === email);
    if (exists) return false;

    users.push({ nombre, email, password });

    await this._storage?.set('users', users);

    return true;
  }

  async login(email: string, password: string): Promise<boolean> {

    const users = (await this._storage?.get('users')) || [];

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      await this._storage?.set('session', user);
      return true;
    }

    return false;
  }

  async logout() {
    await this._storage?.remove('session');
  }

  async isLogged(): Promise<boolean> {
    const session = await this._storage?.get('session');
    return session != null;
  }

  async getUser() {
    return await this._storage?.get('session');
  }
}