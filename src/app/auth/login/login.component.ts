import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  // 🔹 MODALES
  showSuccessModal: boolean = false;
  showFailModal: boolean = false;
  failMessage: string = '';

  // 🔹 ERRORES
  emailError: string = '';
  passwordError: string = '';

  constructor(
    private router: Router,
    private dbService: DatabaseService,
    private cd: ChangeDetectorRef
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // 🔥 VALIDACIÓN EN TIEMPO REAL
  validateFields() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // EMAIL
    if (!this.email) {
      this.emailError = 'Ingresa tu correo';
    } else if (!emailRegex.test(this.email)) {
      this.emailError = 'Correo inválido';
    } else {
      this.emailError = '';
    }

    // PASSWORD
    if (!this.password) {
      this.passwordError = 'Ingresa tu contraseña';
    } else if (this.password.length < 4) {
      this.passwordError = 'Mínimo 4 caracteres';
    } else {
      this.passwordError = '';
    }
  }

  // 🔥 ACTIVAR BOTÓN
  isFormValid(): boolean {
    return (
      this.email !== '' &&
      this.password !== '' &&
      !this.emailError &&
      !this.passwordError
    );
  }

  async login() {

    // 🔥 VALIDAR ANTES DE TODO
    this.validateFields();
    if (!this.isFormValid()) return;

    try {
      await this.dbService.initDB();
      const usuarios = await this.dbService.getUser(this.email);

      const validUser =
        (usuarios.length > 0 && usuarios[0].password === this.password) ||
        (this.email === 'admin@gmail.com' && this.password === '1234');

      if (validUser) {

        // 🔹 MODAL ÉXITO
        this.showSuccessModal = true;
        this.cd.detectChanges();

        setTimeout(() => {
          this.showSuccessModal = false;
          this.router.navigate(['/pages/home-reservasya']);
        }, 2000);

      } else {
        this.triggerFailModal('Correo o contraseña incorrectos ❌');
      }

    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      this.triggerFailModal('Error al iniciar sesión ❌');
    }
  }

  triggerFailModal(message: string) {
    this.failMessage = message;
    this.showFailModal = true;
    this.cd.detectChanges();

    setTimeout(() => {
      this.showFailModal = false;
      this.email = '';
      this.password = '';
    }, 2000);
  }

  irRegistro() {
    this.router.navigate(['/auth/register']);
  }

}