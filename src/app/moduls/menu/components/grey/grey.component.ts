import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/entity/task';
import { ColorsTask } from 'src/app/model/colors-task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-grey',
  templateUrl: './grey.component.html',
  styleUrls: ['./grey.component.scss']
})
export class GreyComponent implements OnInit {


  public greyTasks: Task[] = [];

  constructor(
    private readonly _taskService: TaskService
  ) { }

  public ngOnInit(): void {
    this.findAllGreyTasks();
  }

  public findAllGreyTasks(): void {
    this._taskService.findTasksByColor(ColorsTask.GREY).subscribe((data: Task[]) => {
      this.greyTasks = data;
    })
  }

  public deleteTask(id: number): void {
    this._taskService.deleteTaskById(id).subscribe(() => {
      this.findAllGreyTasks();
    });
  }

}
