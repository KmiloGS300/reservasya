import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,           // ✅ Ahora es standalone
  imports: [IonicModule, FormsModule] // ✅ Para ngModel y componentes Ionic
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private dbService: DatabaseService) {}

  async login() {
    console.log('Botón Login presionado'); // Debug

    // Validaciones básicas
    if (!this.email || !this.password) {
      alert('Completa todos los campos');
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
      // Inicializar DB (por si no se hizo antes)
      await this.dbService.initDB();

      // Obtener usuario desde SQLite
      const usuarios = await this.dbService.getUser(this.email);

      if (usuarios.length > 0 && usuarios[0].password === this.password) {
        alert('Bienvenido 🔥');
        this.router.navigate(['/pages']); // Ruta después del login
        return;
      }

      // Usuario admin de prueba
      if (this.email === 'admin@gmail.com' && this.password === '1234') {
        alert('Bienvenido 🔥');
        this.router.navigate(['/pages']);
      } else {
        alert('Credenciales incorrectas ❌');
      }

    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error al iniciar sesión ❌');
    }
  }

  irRegistro() {
    this.router.navigate(['/auth/register']);
  }
}