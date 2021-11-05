import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewTaskComponent } from './dialog/task/new-task/new-task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'tasks';

  tasks = {
    progress: {
      title: "Em andamento",
      rows: [],
    },
    completed: {
      title: "Concluídos",
      rows: [],
    },
  }

  loading: boolean = true;

  constructor(
    private http: HttpClient,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {

    this.http.get('https://backend-tarefa-teteu.herokuapp.com/tasks/').subscribe((data: Task[]) => {
      this.tasks.completed.rows = data.filter((task) => task.finished).sort((a, b) => a.id - b.id).reverse();
      this.tasks.progress.rows = data.filter((task) => !task.finished).reverse();
      this.loading = false;
    })

  }

  handleFinalizateTask(task: Task) {

    task.handing = true;

    this.http.patch('https://backend-tarefa-teteu.herokuapp.com/tasks/' + task.id, {}).subscribe(
      (response: any) => {

        task.finished = true
        this.tasks.progress.rows = this.tasks.progress.rows.filter((_task) => _task.id != task.id)
        this.tasks.completed.rows.push(task)
        this.tasks.completed.rows = this.tasks.completed.rows.sort((a, b) => a.id - b.id).reverse();


      },
      (error: any) => { },
      () => { task.handing = false }
    )

  }

  handleDelete(task: Task) {
    task.handing = true;
    this.http.delete('https://backend-tarefa-teteu.herokuapp.com/tasks/' + task.id).subscribe(
      (response: any) => { this.tasks.progress.rows = this.tasks.progress.rows.filter((_task) => _task.id !== task.id) },
      () => { },
      () => { task.handing = false }
    )
  }

  getSections() {
    return Object.keys(this.tasks)

  }

  addNew() {
    const dialogRef = this.dialogService.open(NewTaskComponent)
    dialogRef.afterClosed().subscribe(result => {

      if (result.id)
        this.tasks.progress.rows.unshift(result)

    });


  }

}

interface Task {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  handing?: boolean;

}