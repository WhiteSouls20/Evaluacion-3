import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { taskI } from 'src/models/task.models';

@Component({
  selector: 'app-agregar-nota',
  templateUrl: './agregar-nota.page.html',
  styleUrls: ['./agregar-nota.page.scss'],
})
export class AgregarNotaPage implements OnInit {

  tarea: string = '';  // Captura la descripción de la tarea
  fecha: string = '';  // Captura la fecha seleccionada
  foto: string = '';   // Captura el webPath de la foto

  task: taskI[] = [];
  newTask: taskI;

  constructor(private router: Router, private firestoreservice: FirestoreService) {
    this.initTask();
  }

  initTask() {
    this.newTask = {
      titulo: null,
      descripcion: null,
      estado: null,
      idtasks: this.firestoreservice.createIdDoc()
    }
  }

  // Método para guardar la tarea en localStorage
  async save() {
    // Si no se selecciona fecha, asignar la fecha actual

    await this.firestoreservice.createDocumentID(this.newTask, 'Task', this.newTask.idtasks)


    // Asignar la fecha seleccionada a la tarea
    this.newTask.fecha = this.fecha;

    // Guardar la tarea en localStorage, pero sin enviar la fecha a Firestore
    let tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.newTask.fecha = this.fecha; // Guardar solo la fecha localmente
    tareasGuardadas.push(this.newTask);
    localStorage.setItem('tareas', JSON.stringify(tareasGuardadas));

    // Redirigir a la página principal
    this.router.navigate(['/home']);
  }

  // Método para cancelar y regresar a la página principal
  cancelar() {
    this.router.navigate(['/home']);
  }

  ngOnInit() {}
}
