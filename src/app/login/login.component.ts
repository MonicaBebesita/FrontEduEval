import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../components/atoms/icon/icon.component';
import { AuthService } from '../services/seguridad/auth.service';

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
    console.log('[LoginComponent] Usuario:', this.username); // ¡Cuidado con mostrar la contraseña en logs de producción!

    if (!this.username || !this.password) {
      this.error = 'Por favor ingrese usuario y contraseña.';
      console.error('[LoginComponent] Error: Usuario o contraseña vacíos.');
      return;
    }

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.error = null;
        console.log('[LoginComponent] Login exitoso. Redirigiendo a /dashboard.');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Credenciales incorrectas.';
        console.error('[LoginComponent] Error en el login:', err); // Loggea el error completo para depuración
      },
    });
  }
}