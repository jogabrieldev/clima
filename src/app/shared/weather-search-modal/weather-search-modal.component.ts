import { Component } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { sunnyOutline, cloudOutline, umbrellaOutline } from 'ionicons/icons';

// ícones customizados
addIcons({
  'sunny-outline': sunnyOutline,
  'cloud-outline': cloudOutline,
  'rainy-outline': umbrellaOutline 
});

@Component({
  selector: 'app-weather-search-modal',
  templateUrl: './weather-search-modal.component.html',
  styleUrls: ['./weather-search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class WeatherSearchModalComponent {
  query: string = '';
  searchType: 'city' | 'cep' = 'city';

  constructor(
    private modalCtrl: ModalController,
  ) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
  

   submitSearch() {
    if (!this.query.trim()) {
      return;
    }

    const searchData = {
      type: this.searchType,
      value: this.query.trim(),
    };

    this.modalCtrl.dismiss(searchData);
  }
}
