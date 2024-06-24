import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TaskService } from './services/task.service';
import { PopoverComponent } from './popover/popover.component';

import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './credential'; 
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    TaskService,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
