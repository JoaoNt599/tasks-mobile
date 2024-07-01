import { TaskService } from './../services/task.service';
import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  type : string = "pending";
  public tasks!: Observable<any[]>;

  constructor(
    public alertController: AlertController, 
    public taskService: TaskService,
    public toastController: ToastController,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    //this.taskService.getFromStorage();
    this.tasks = this.taskService.getFromFirestore();
  }

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Add Task',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Task'
        },
        {
          name: 'date',
          type: 'date',
          min: '2019-03-01',
          max: '2025-12-31'
        }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel', },
        { text: 'Save', handler: (alertData) => { 
          if (alertData.task != "")
            this.taskService.addTask(alertData.task, alertData.date);
          else {
            this.presentToast();
            this.presentAlertPromptAdd();
          }
        } 
      }]
    });
    await alert.present();
  }

  async presentAlertPromptUpdate(index: number, task: any) {
    const alert = await this.alertController.create({
      header: 'Update Task',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Task',
          value: task.value
        },
        {
          name: 'date',
          type: 'date',
          min: '2019-03-01',
          max: '2025-12-31',
          value: task.date ? task.date.toDate().getFullYear() + "-" + 
          ((task.date.toDate().getMonth()+1) < 10 ? "0" + task.date.toDate().getMonth()+1 : task.date.toDate().getMonth()+1) 
          + "-" +  
          ((task.date.toDate().getDate()) < 10 ? "0" + task.date.toDate().getDate() : task.date.toDate()) : ''
        },
      ],
      buttons: [
        { text: 'Cancel', 
          role: 'cancel' 
        },
        { text: 'Save', 
          handler: (alertData) => { 
          if (alertData.task != "")
            this.taskService.updateTask(index, alertData.task, alertData.date, task.done)
          else {
            this.presentToast();
            this.presentAlertPromptUpdate(index, task)
          }
        } 
      }]
    });
    await alert.present();
  }

  async presentAlertPromptDel(index: number) {
    const alert = await this.alertController.create({
      header: 'Delete task',
      message: 'Do you want to delete the task?',
      buttons: [
        { text: 'Cancel', 
          role: 'cancel' 
        },
        { 
          text: 'Delete', handler: () => this.taskService.deleteOnFirestore(index)
        }   
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Complete the task!",
      duration: 2000
    });
    toast.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
