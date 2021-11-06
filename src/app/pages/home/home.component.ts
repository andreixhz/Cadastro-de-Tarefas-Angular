import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewTaskComponent } from 'src/app/dialog/task/new-task/new-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {


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
    private dialogService: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.http.get('https://backend-tarefa-teteu.herokuapp.com/tasks/').subscribe((data: Task[]) => {
      this.tasks.completed.rows = data.filter((task) => task.finished).reverse();
      this.tasks.progress.rows = data.filter((task) => !task.finished).reverse();
      this.loading = false;
    },
      (err: any) => {
        if (err.status) {
          localStorage.clear();
          this.router.navigate(['login'])

        }

      },
    )

  }

  handleFinalizateTask(task: Task, status: boolean, clickButton: boolean = false) {

    task.handing = true;

    let _task = {
      ...task,
      finished: status
    }

    delete _task.handing;

    this.http.put('https://backend-tarefa-teteu.herokuapp.com/tasks/' + task.id, _task).subscribe(
      (response: any) => {

        task.finished = status

        if (!clickButton) return;

        console.log('teste')
        this.tasks.progress.rows = this.tasks.progress.rows.filter((_task) => _task.id !== task.id)
        this.tasks.completed.rows.unshift(task)
      },
      (error: any) => { },
      () => { task.handing = false }
    )

  }

  handleDelete(task: Task) {
    task.handing = true;
    this.http.delete('https://backend-tarefa-teteu.herokuapp.com/tasks/' + task.id).subscribe(
      (response: any) => { this.tasks.progress.rows = this.tasks.progress.rows.filter((_task) => _task.id !== task.id) },
      (err: any) => { console.log(err.status) },
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

  drop(event: CdkDragDrop<Task[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      this.saveTask(event.previousContainer.data[event.previousIndex])
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  saveTask(task: Task) {

    if (task.finished === false) {
      this.handleFinalizateTask(task, true);
    } else {
      this.handleFinalizateTask(task, false);
    }

  }
}


interface Task {
  id: number;
  title: string;
  description: string;
  finished: boolean;
  handing?: boolean;

}