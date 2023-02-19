import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GREY_URL, RED_URL, TASKS_URL, YELLOW_URL } from 'src/app/environment/url';
import { ListTasksComponent } from './components/all-colors/list-tasks.component';
import { GreyComponent } from './components/grey/grey.component';
import { RedComponent } from './components/red/red.component';
import { TaskDataComponent } from './components/task-data/task-data.component';
import { CreateTaskComponent } from './components/update-create-task/create-task.component';
import { YellowComponent } from './components/yellow/yellow.component';


const routes: Routes = [
  { path: "add", component: CreateTaskComponent },
  { path: "update/:taskId", component: CreateTaskComponent },
  { path: "data/:taskId", component: TaskDataComponent },
  { path: TASKS_URL, component: ListTasksComponent },
  { path: GREY_URL, component: GreyComponent },
  { path: RED_URL, component: RedComponent },
  { path: YELLOW_URL, component: YellowComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class MenuRoutingModule { }






