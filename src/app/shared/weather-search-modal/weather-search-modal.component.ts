import { Component ,Output, EventEmitter } from '@angular/core';
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
  public query: string = '';
  public searchType: string ="city";
  @Output() onSearch = new EventEmitter<any>()

  constructor(
    private modalCtrl: ModalController,
  ) {}

  closeModal() {
    this.modalCtrl.dismiss(null);
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
