import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/entity/task';
import { TASKS_URL } from 'src/app/environment/url';
import { ButtonItem } from 'src/app/model/button-item';
import { ColorsTask } from 'src/app/model/colors-task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  public task: Task = new Task;

  public IsOnUpdate!: boolean;

  public errorMessage!: string;

  public chosenColor!: ColorsTask;
  public style!: string;
  public isChosen!: boolean;

  constructor(
    private readonly _taskService: TaskService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.checkPage();
  }

  public items: ButtonItem[] = [
    { back: "colors__color-grey", color: ColorsTask.GREY },
    { back: "colors__color-red", color: ColorsTask.RED },
    { back: "colors__color-yellow", color: ColorsTask.YELLOW }
  ];

  public onClick(color: ColorsTask, style: string): void {
    this.isChosen = true;
    this.chosenColor = color;
    this.style = style;
  }

  public checkPage(): void {
    const routeParams = this._route.snapshot.paramMap;
    const taskId = Number(routeParams.get("taskId"));
    if (taskId) {
      this._taskService.findTaskById(taskId).subscribe(data => {
        this.task = data;
      });
      this.IsOnUpdate = true;
    }
  }

  public onUpdateOrCreate(): void {
    if (this.IsOnUpdate === true) {
      this.updateTaskById();
    } else {
      this.createNewTask();
    }
  }

  public updateTaskById(): void {
    this.subscribeMethod(this._taskService.updateTaskById(this.task, this.task.id));
  }

  public createNewTask(): void {
    this.subscribeMethod(this._taskService.createNewTask(this.task));
  }

  public subscribeMethod(task: Observable<Task>): void {
    this.task.color = this.chosenColor;
    task.subscribe(
      res => console.log('HTTP response', res),
      err => this.errorMessage = err.error.message,
      () => this.navigateToMainPage()
    );
  }

  public navigateToMainPage(): void {
    this._router.navigateByUrl("/" + TASKS_URL);
  }
}
