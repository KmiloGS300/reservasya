import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class RegisterComponent {

  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  showPassword: boolean = false;

  showSuccessModal = false;
  showFailModal = false;
  failMessage = '';

  nombreError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private auth: AuthService
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  validateFields() {

    this.nombreError = !this.nombre || this.nombre.length < 3 ? 'Mínimo 3 caracteres' : '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailError = !this.email || !emailRegex.test(this.email) ? 'Correo inválido' : '';

    this.passwordError = !this.password || this.password.length < 4 ? 'Mínimo 4 caracteres' : '';

    this.confirmPasswordError =
      this.password !== this.confirmPassword ? 'No coinciden' : '';
  }

  isFormValid(): boolean {
    return (
      this.nombre !== '' &&
      this.email !== '' &&
      this.password !== '' &&
      this.confirmPassword !== '' &&
      !this.nombreError &&
      !this.emailError &&
      !this.passwordError &&
      !this.confirmPasswordError
    );
  }

  async register() {

    this.validateFields();
    if (!this.isFormValid()) return;

    try {

      const ok = await this.auth.register(this.nombre, this.email, this.password);

      if (!ok) {
        this.triggerFailModal('El correo ya está registrado ❌');
        return;
      }

      this.showSuccessModal = true;
      this.cd.detectChanges();

      setTimeout(() => {
        this.showSuccessModal = false;

        this.nombre = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        this.router.navigate(['/auth/login']);
      }, 2000);

    } catch {
      this.triggerFailModal('Error creando cuenta ❌');
    }
  }

  triggerFailModal(message: string) {
    this.failMessage = message;
    this.showFailModal = true;
    this.cd.detectChanges();

    setTimeout(() => {
      this.showFailModal = false;
    }, 2000);
  }

  irLogin() {
    this.router.navigate(['/auth/login']);
  }
}