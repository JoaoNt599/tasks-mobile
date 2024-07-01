import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private collectionName: string = 'Task';

  constructor(private firestore: AngularFirestore) {
    this.getFromStorage();
  }

  public getTasks(): Task[] {
    return this.tasks;
  }

  public addTask(value: string, date: string) {
    let task: Task;
    if (date != '') {
      date = date.replace("-", "/");
      task = {
        value: value,
        date: new Date(date),
        done: false,
      };
    } else {
      task = {
        value: value,
        done: false
      };
    }
    this.tasks.push(task);
    this.addTOFirestore(task);
    this.setToStorage();
  }

  public delTask(index: number) {
    this.tasks.splice(index, 1);
    this.setToStorage();
  }

  public updateTask(index: number, value: string, date: string, done: boolean) {
    let task: Task;
    if (date != '') {
      date = date.replace("-", "/");
      task = {
        value: value,
        date: new Date(date),
        done: done
      };
    } else {
      task = {
        value: value,
        done: done 
      };
    }
    this.updateOnFirestore(index, task);
    
    /* let task: Task = this.tasks[index];
    task.value = value;
    date = date.replace("-", "/");
    task.date = new Date(date);
    this.tasks.splice(index, 1, task); 
    this.setToStorage(); */
  }

  public updateTaskDone(id: number , task: Task) {
    task.done = !task.done;
    this.updateOnFirestore(id, task);
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
        date: t.date ? new Date(t.date) : undefined,
        done: t.done
      }));
    }
  }

  public addTOFirestore(record: Task) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  public getFromFirestore() {
    return this.firestore.collection(this.collectionName).valueChanges({idField: 'id'})
  }

  public updateOnFirestore(recordId: number, record: Task) {
    this.firestore.doc(this.collectionName + '/' + recordId).update(record);
  }

  public deleteOnFirestore(recordId: number) {
    this.firestore.doc(this.collectionName + '/' + recordId).delete();
  }
  
}

interface Task {
  value: string;
  date?: Date;
  done: boolean;
}
