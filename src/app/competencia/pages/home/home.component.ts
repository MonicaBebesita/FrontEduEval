import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Competencia } from '../../modelos/Competencia';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    competencias: Competencia[] = [
    {
      id: 'COMP001',
      descripcion: 'Aplicar principios de diseño orientado a objetos',
      nivel: 'avanzado',
    },
    {
      id: 'COMP002',
      descripcion: 'Comprender fundamentos de bases de datos relacionales',
      nivel: 'intermedio',
    },
    {
      id: 'COMP003',
      descripcion: 'Conocer estructuras básicas de control en programación',
      nivel: 'básico',
    }
  ];


}
