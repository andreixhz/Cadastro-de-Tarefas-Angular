import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.sass']
})
export class NewTaskComponent {

  title: string;
  description: string;
  handing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<NewTaskComponent>,
    private http: HttpClient
  ) { }


  handleSave() {
    this.handing = true;

    this.http.post('https://backend-tarefa-teteu.herokuapp.com/tasks/', { title: this.title, description: this.description }).subscribe(
      (response) => {
        this.dialogRef.close(response)
      },
      () => { },
      () => { this.handing = false }
    )
  }

}
