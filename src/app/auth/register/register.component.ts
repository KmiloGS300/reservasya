import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class RegisterComponent {

  nombre = '';
  email = '';
  password = '';

  constructor(private router: Router, private dbService: DatabaseService) {}

  async register() {
    if (!this.nombre || !this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    if (this.nombre.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Ingresa un correo válido');
      return;
    }

    if (this.password.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    try {
      await this.dbService.initDB();

      const usuariosExistentes = await this.dbService.getUser(this.email);

      if (usuariosExistentes.length > 0) {
        alert('El correo ya está registrado ❌');
        return;
      }

      await this.dbService.addUser(this.nombre, this.email, this.password);
      alert('Cuenta creada correctamente 🎉');

      this.nombre = '';
      this.email = '';
      this.password = '';

      this.router.navigate(['/auth/login']);
    } catch (err: any) {
      console.error('Error en registro:', err);
      alert('Error creando cuenta ❌');
    }
  }

  irLogin() {
    this.router.navigate(['/auth/login']);
  }
}