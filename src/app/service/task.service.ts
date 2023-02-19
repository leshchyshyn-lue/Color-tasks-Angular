import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Task } from '../entity/task';
import { Observable } from 'rxjs';
import { MAIN_URL, TASKS_URL } from '../environment/url';
import { ColorsTask } from '../model/colors-task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {


  constructor(
    private readonly _http: HttpClient,
  ) { }

  public findAllTasks(): Observable<Task[]> {
    return this._http.get<Task[]>(MAIN_URL + "/" + TASKS_URL);
  }

  public findTasksByColor(color: string): Observable<Task[]> {
    return this._http.get<Task[]>(MAIN_URL + "/by/" + color.toUpperCase());
  }

  public createNewTask(task: Task): Observable<Task> {
    return this._http.post<Task>(MAIN_URL + "/add", task);
  }

  public updateTaskById(task: Task, id: number): Observable<Task> {
    return this._http.put<Task>(MAIN_URL + "/" + id, task);
  }

  public findTaskById(id: number): Observable<Task> {
    return this._http.get<Task>(MAIN_URL + "/" + id);
  }

  public deleteTaskById(id: number): Observable<Task> {
    return this._http.delete<Task>(MAIN_URL + "/" + id);
  }

  public deleteAllTasks(): Observable<Task[]> {
    return this._http.delete<Task[]>(MAIN_URL + "/clear");
  }

  public deleteTasksByColor(color: ColorsTask): Observable<Task[]> {
    return this._http.delete<Task[]>(MAIN_URL + "/clear/" + color);
  }

}
