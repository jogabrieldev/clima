import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { sunny, cloud, umbrella } from 'ionicons/icons'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent , IonButton, RouterModule],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  sunny = sunny;
  cloud = cloud;
  umbrella = umbrella;
  constructor() {}
}
