import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../components/atoms/icon/icon.component';
import { AuthService } from '../services/seguridad/auth.service';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    console.log('[LoginComponent] Intentando iniciar sesión...');
    console.log('[LoginComponent] Usuario:', this.username);

    if (!this.username || !this.password) {
      this.error = 'Por favor ingrese usuario y contraseña.';
      console.error('[LoginComponent] Error: Usuario o contraseña vacíos.');
      this.showToast(this.error, 'linear-gradient(to right, #ff5f6d, #ffc371)');
      return;
    }

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.error = null;
        this.showToast('¡Inicio de sesión exitoso!', 'linear-gradient(to right, #00b09b, #96c93d)');
        console.log('[LoginComponent] Login exitoso. Redirigiendo a /dashboard.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas.';
        this.showToast(this.error, 'linear-gradient(to right, #ff5f6d, #ffc371)');
        console.error('[LoginComponent] Error en el login:', err);
      },
    });
  }

  onInputChange() {
    if (this.error) {
      this.error = null;
    }
  }

  // Método para lanzar toasts
  private showToast(message: string, background: string) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: background,
      stopOnFocus: true,
    }).showToast();
  }
}
