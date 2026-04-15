import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  showSuccessModal: boolean = false;
  showFailModal: boolean = false;
  failMessage: string = '';

  emailError: string = '';
  passwordError: string = '';

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private auth: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  validateFields() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.emailError = !this.email
      ? 'Ingresa tu correo'
      : !emailRegex.test(this.email)
      ? 'Correo inválido'
      : '';

    this.passwordError = !this.password
      ? 'Ingresa tu contraseña'
      : this.password.length < 4
      ? 'Mínimo 4 caracteres'
      : '';
  }

  isFormValid(): boolean {
    return this.email !== '' &&
           this.password !== '' &&
           !this.emailError &&
           !this.passwordError;
  }

  async login() {

    this.validateFields();
    if (!this.isFormValid()) return;

    try {

      const ok = await this.auth.login(this.email, this.password);

      if (ok) {
        this.showSuccessModal = true;
        this.cd.detectChanges();

        // 🔥 OBTENER USUARIO
        const user = await this.auth.getUser();

        setTimeout(() => {
          this.showSuccessModal = false;

          // 🔥 REDIRECCIÓN SEGÚN ROL
          if (user?.role === 'admin') {
            this.router.navigate(['/pages/admin']);
          } else {
            this.router.navigate(['/pages/home-reservasya']);
          }

        }, 2000);

      } else {
        this.triggerFailModal('Correo o contraseña incorrectos ❌');
      }

    } catch (err) {
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