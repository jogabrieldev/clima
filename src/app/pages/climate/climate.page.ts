import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController , AlertController} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, 
  refreshOutline, 
  closeOutline, 
  locationSharp, 
  waterOutline,  
  chevronDownOutline } from 'ionicons/icons';
import { WeatherSearchModalComponent } from '../../shared/weather-search-modal/weather-search-modal.component';
import { CityWeatherService } from 'src/services/weather.service';
import { CepWeatherService } from 'src/services/cep.weather.service';
import { ValidadeInputService } from 'src/services/validadeInput.service';

addIcons({
  'arrow-back-outline': arrowBackOutline,
  'refresh-outline': refreshOutline,
  'close-outline': closeOutline,
  'chevron-down-outline': chevronDownOutline,
  'location-sharp': locationSharp,
  'water-outline': waterOutline,
});


@Component({
  selector: 'app-climate',
  templateUrl: './climate.page.html',
  styleUrls: ['./climate.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})

export class ClimatePage implements OnInit {
  public query: string = '';
  public weatherData: any = null;
  public loading: boolean = false;
  public showModal:boolean = true;
  public errorMessage: string = '';
  public isValidInput:boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private weatherService: CityWeatherService,
    private cepWeatherService: CepWeatherService,
    public validadeInputService: ValidadeInputService
  ) {}

  ngOnInit() {
    this.openSearchModal();
  };

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
     header: header,
     message: message,
      buttons: [
        {
          text: 'Tentar novamente',
          handler: () => {
           this.openSearchModal();
          }
        },
        {
          text: 'Fechar',
          handler: () => {
           this.openSearchModal(); 
          },
         role: 'cancel'
       }
     ],
       mode: 'ios' 
    });
    await alert.present();
  }

  async openSearchModal() {
    const modal = await this.modalCtrl.create({
      component: WeatherSearchModalComponent,
      cssClass: 'custom-modal-center',
      backdropDismiss: true,
      mode: 'md'
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.handleSearch(data);
    }else{
      throw new Error("Nenhuma busca realizada. Modal fechada sem ação.")
    }
  }

  handleSearch(event: any) {
    if (!event) {
    this.showModal = false;
    return;
    }
    const { type, value } = event;
    const queryTrimmed = value ? value.trim() : '';

    if (type === 'cep') {
     this.isValidInput = this.validadeInputService.validateCep(queryTrimmed);
    } else {
  
    this.isValidInput = queryTrimmed.length > 0; 
   }
   if (!this.isValidInput) {
    this.errorMessage = type === 'cep' 
      ? 'Por favor, digite um CEP válido com 8 números.' 
      : 'Por favor, selecione uma localização válida.';
    this.showModal = false;
    this.showAlert('Dados Inválidos', this.errorMessage);
    return;
  }
  this.query = queryTrimmed;
  this.showModal = false;

  if (type === 'cep') {
    const clearCep = this.query.replace(/\D/g, '');
    this.fetchByCep(clearCep);
  } else {
    this.fetchWeather(this.query);
  }
  
  }
  fetchWeather(city: string) {
   if(!city) return;
   this.weatherData = null;
   this.errorMessage = '';
   this.loading = true;
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
       const lastUpdatedDate = new Date(data.current.last_updated.replace(' ', 'T'));
        this.weatherData = {
         ...data,
          current: {
           ...data.current,
           last_updated_date: lastUpdatedDate
          }
        };
        this.loading = false;
      },
      error: () => {
      this.loading = false;
      this.showAlert('Erro na Busca', 'Não conseguimos encontrar o clima para esta localização.'); 
      },
    });
  }

  fetchByCep(cep: string) {
    if(!cep)return;
    this.weatherData = null;
    this.errorMessage = '';
    this.loading = true;
    this.cepWeatherService.getWeatherByCep(cep).subscribe({
      next: (data) => {
        const lastUpdatedDate = new Date(data.dt * 1000);
        this.weatherData = {
          location: {
            name: data.name,
            region: data.sys?.state || '',
            country: data.sys.country,
          },
          current: {
            temp_c: data.main.temp,
            humidity: data.main.humidity,
            wind_kph: data.wind.speed,
            condition: {
              text: data.weather[0].description,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            },
             last_updated_date: lastUpdatedDate
          },
        };
        this.loading = false;
      },
      error: (err) => {
       this.loading = false;
       this.showAlert('CEP não encontrado', err.message || 'Verifique se o CEP está correto e tente novamente.');
      },
    });
  };
  resetSearch() {
    this.weatherData = null; 
    this.query = ''; 
    this.openSearchModal();
  }
};





