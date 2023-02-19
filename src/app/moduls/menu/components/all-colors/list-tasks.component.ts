import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonItem } from 'src/app/model/button-item';
import { ColorsTask } from 'src/app/model/colors-task';
import { ModalWindowComponent } from 'src/app/components/confirmation-window/confirmation-window.component';
import { TaskService } from 'src/app/service/task.service';
import { GreyComponent } from '../grey/grey.component';
import { RedComponent } from '../red/red.component';
import { YellowComponent } from '../yellow/yellow.component';



@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  @ViewChild(GreyComponent)
  greyComponent!: GreyComponent;
  @ViewChild(RedComponent)
  redComponent!: RedComponent;
  @ViewChild(YellowComponent)
  yellowComponent!: YellowComponent;

  public items: ButtonItem[] = [
    { back: "colors__color-grey", color: ColorsTask.GREY },
    { back: "colors__color-red", color: ColorsTask.RED },
    { back: "colors__color-yellow", color: ColorsTask.YELLOW }
  ]

  public showRemoveMenu!: boolean;

  public isGrey!: boolean;
  public isRed!: boolean;
  public isYellow!: boolean;

  constructor(
    private readonly _matDialog: MatDialog,
    private readonly _taskService: TaskService
  ) { }

  public ngOnInit(): void {
    this.tasksLength();
  }

  public reload(): void {
    this.greyComponent?.ngOnInit();
    this.redComponent?.ngOnInit();
    this.yellowComponent?.ngOnInit();
  }

  public tasksLength(): void {
    this._taskService.findAllTasks().subscribe(data => {
      if (data.length >= 2) {
        this.showRemoveMenu = true;
      } else {
        this.showRemoveMenu = false;
      }
    })
  }

  public deleteTask(id: number): void {
    this._taskService.deleteTaskById(id).subscribe(() => {
      this.tasksLength();
      this.reload();
    });

  }

  public onDeleteAllColors(): void {
    let dialogRef = this._matDialog.open(ModalWindowComponent,
      {
        data: "Are you sure you want to delete all your tasks?"
      });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.deleteAllTasks();
      }
    });
  }

  public deleteAllTasks() {
    return this._taskService.deleteAllTasks().subscribe(() => {
      this.reload();
      this.showRemoveMenu = false;
    });
  }

  public onClick(color: ColorsTask): void {
    if (color === ColorsTask.GREY) {
      this.isGrey = !this.isGrey
    }
    if (color === ColorsTask.RED) {
      this.isRed = !this.isRed
    }
    if (color === ColorsTask.YELLOW) {
      this.isYellow = !this.isYellow;
    }
  }

  public onDeleteByColor(): void {
    if (this.isGrey === true) {
      this.deleteByColor(ColorsTask.GREY);
    }
    if (this.isRed === true) {
      this.deleteByColor(ColorsTask.RED);
    }
    if (this.isYellow === true) {
      this.deleteByColor(ColorsTask.YELLOW);
    }
  }

  public deleteByColor(color: ColorsTask) {
    return this._taskService.deleteTasksByColor(color).subscribe(() => {
      this.tasksLength();
      this.reload();
    });
  }
}






