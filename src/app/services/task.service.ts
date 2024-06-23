import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private tasks: Task[] = []

  constructor() { }

  public getTasks(): Task[] {
    return this.tasks
  }

  public addTask(value: string, date: string) {
    date = date.replace("-", "/");
    let task : Task = {
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

  async setToStorage() {
    await Storage['set']({
      key: 'tasks',
      value: JSON.stringify(this.tasks)
    });
  }
}

interface Task {
  value: string
  date: Date
  done?: boolean
}
