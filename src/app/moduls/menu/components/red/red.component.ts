import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/entity/task';
import { ColorsTask } from 'src/app/model/colors-task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-red',
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.scss']
})
export class RedComponent implements OnInit {

  public redTasks: Task[] = [];

  constructor(
    private readonly _taskService: TaskService
  ) { }

  public ngOnInit(): void {
    this.findAllRedTasks();
  }

  public findAllRedTasks(): void {
    this._taskService.findTasksByColor(ColorsTask.RED).subscribe((data: Task[]) => {
      this.redTasks = data;
    })
  }

  public deleteTask(id: number): void {
    this._taskService.deleteTaskById(id).subscribe(() => {
      this.findAllRedTasks();
    });
  }

}
