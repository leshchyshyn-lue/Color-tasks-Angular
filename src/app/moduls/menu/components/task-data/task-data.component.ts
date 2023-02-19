import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../../entity/task';
import { TaskService } from '../../../../service/task.service';

@Component({
  selector: 'app-task-data',
  templateUrl: './task-data.component.html',
  styleUrls: ['./task-data.component.scss']
})
export class TaskDataComponent implements OnInit {

  public task!: Task;

  constructor(
    private readonly _taskService: TaskService,
    private readonly _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const routeParam = this._route.snapshot.paramMap;
    const idFromRoute = Number(routeParam.get("taskId"));
    this._taskService.findTaskById(idFromRoute).subscribe(data => {
      this.task = data;
    });
  }

}
