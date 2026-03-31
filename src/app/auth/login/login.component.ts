import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  showPassword: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private dbService: DatabaseService
  ) {}

  // 👁 Mostrar / ocultar contraseña
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async login() {

    // 🔴 Validaciones (refuerzo)
    if (!this.email || !this.password) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) return;

    if (this.password.length < 4) return;

    this.isLoading = true;

    // ⏳ Simular carga (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      await this.dbService.initDB();

      const usuarios = await this.dbService.getUser(this.email);

      // ✅ Usuario desde DB
      if (usuarios.length > 0 && usuarios[0].password === this.password) {
        this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
        return;
      }

      // ✅ Admin fallback
      if (this.email === 'admin@gmail.com' && this.password === '1234') {
        this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
        return;
      }

      // ❌ Error
      alert('Credenciales incorrectas ❌');

    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      alert('Error al iniciar sesión ❌');
    } finally {
      this.isLoading = false;
    }
  }

  irRegistro() {
    this.router.navigate(['/auth/register']);
  }
}