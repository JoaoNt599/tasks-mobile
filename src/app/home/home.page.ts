import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController) {}

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
        { text: 'Cancel', role: 'cancel' },
        { text: 'Save', handler: () => { console.log('Confirm Ok'); } }
      ]
    });
    await alert.present();
  }
}
