import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TaskDataComponent } from './components/task-data/task-data.component';
import { ListTasksComponent } from './components/all-colors/list-tasks.component';
import { GreyComponent } from './components/grey/grey.component';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { RedComponent } from './components/red/red.component';
import { YellowComponent } from './components/yellow/yellow.component';
import { CreateTaskComponent } from './components/update-create-task/create-task.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [
    BrowserModule,
    MenuRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  declarations: [
    MenuComponent,
    ListTasksComponent,
    GreyComponent,
    RedComponent,
    YellowComponent,
    TaskDataComponent,
    CreateTaskComponent,
  ],
  exports: [MenuComponent],

})
export class MenuModule { }
