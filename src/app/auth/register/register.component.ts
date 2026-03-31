import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  // 🔹 MODALES
  showSuccessModal: boolean = false;
  showFailModal: boolean = false;
  failMessage: string = '';

  // 🔹 ERRORES
  nombreError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

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

    // NOMBRE
    if (!this.nombre) {
      this.nombreError = 'Ingresa tu nombre';
    } else if (this.nombre.length < 3) {
      this.nombreError = 'Mínimo 3 caracteres';
    } else {
      this.nombreError = '';
    }

    // EMAIL
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    // CONFIRMAR PASSWORD
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Confirma tu contraseña';
    } else if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'No coinciden';
    } else {
      this.confirmPasswordError = '';
    }
  }

  // 🔥 ACTIVAR BOTÓN
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
      await this.dbService.initDB();
      const usuariosExistentes = await this.dbService.getUser(this.email);

      if (usuariosExistentes.length > 0) {
        this.triggerFailModal('El correo ya está registrado ❌');
        return;
      }

      await this.dbService.addUser(this.nombre, this.email, this.password);

      // 🔹 MODAL ÉXITO
      this.showSuccessModal = true;
      this.cd.detectChanges();

      setTimeout(() => {
        this.showSuccessModal = false;

        // limpiar
        this.nombre = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        this.router.navigate(['/auth/login']);
      }, 2000);

    } catch (err) {
      console.error('Error en registro:', err);
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