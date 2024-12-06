import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FirestoreService } from '../servicios/firestore.service';
import { taskI } from 'src/models/task.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuario: string = '';
  task: taskI[] = [];
  newTask: taskI;



  constructor(private storage: Storage, private firestoreservice: FirestoreService) {
    this.loadtask();
  }

  async delete(task:taskI){

    await this.firestoreservice.deleteDocumentID('Task', task.idtasks);

  }

  // Cargar las tareas desde localStorage al entrar en la página
  ionViewWillEnter() {
    this.loadtask();
  }

    edit (task: taskI) {
    this.newTask = task;
  }

  loadtask(){

    this.firestoreservice.getCollectionChanges<taskI>('Task').subscribe( data=> {

      if (data){
        this.task = data
        
      }

    } )
  }

  async ngOnInit() {
    await this.storage.create();
    this.nombreUsuario = await this.storage.get("email");
  }
}
