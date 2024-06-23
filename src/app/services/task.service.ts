import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasks: Task[] = [];

  constructor() {
    this.getFromStorage();
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public addTask(value: string, date: string) {
    date = date.replace("-", "/");
    let task: Task = {
      value: value,
      date: new Date(date),
      done: false
    };
    this.tasks.push(task);
    this.setToStorage();
  }

  public delTask(index: number) {
    this.tasks.splice(index, 1);
    this.setToStorage();
  }

  public updateTask(index: number, value: string, date: string) {
    let task: Task = this.tasks[index];
    task.value = value;
    date = date.replace("-", "/");
    task.date = new Date(date);
    this.tasks.splice(index, 1, task);
    this.setToStorage();
  }

  public async setToStorage() {
    await Storage.set({
      key: 'tasks',
      value: JSON.stringify(this.tasks)
    });
  }

  public async getFromStorage() {
    const resp = await Storage.get({ key: 'tasks' });
    const tempTasks = JSON.parse(resp.value || '[]');

    if (tempTasks != null) {
      this.tasks = tempTasks.map((t: any) => ({
        value: t.value,
        date: new Date(t.date),
        done: t.done
      }));
    }
  }
}

interface Task {
  value: string;
  date: Date;
  done?: boolean;
}
