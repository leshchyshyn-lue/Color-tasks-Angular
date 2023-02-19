import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/entity/task';
import { ColorsTask } from 'src/app/model/colors-task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-yellow',
  templateUrl: './yellow.component.html',
  styleUrls: ['./yellow.component.scss']
})
export class YellowComponent implements OnInit {

  public yellowTasks: Task[] = [];

  constructor(
    private readonly _taskService: TaskService
  ) { }

  public ngOnInit(): void {
    this.findAllYellowTasks();
  }

  public findAllYellowTasks(): void {
    this._taskService.findTasksByColor(ColorsTask.YELLOW).subscribe((data: Task[]) => {
      this.yellowTasks = data;
    })
  }

  public deleteTask(id: number): void {
    this._taskService.deleteTaskById(id).subscribe(() => {
      this.findAllYellowTasks();
    });
  }

}
