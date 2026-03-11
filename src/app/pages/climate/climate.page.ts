import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { arrowBackOutline, refreshOutline } from 'ionicons/icons';
import { WeatherSearchModalComponent } from '../../shared/weather-search-modal/weather-search-modal.component';
import { CityWeatherService } from 'src/services/weather.service';
import { CepWeatherService } from 'src/services/cep.weather.service';

addIcons({
  'arrow-back-outline': arrowBackOutline,
  'refresh-outline': refreshOutline,
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

  constructor(
    private modalCtrl: ModalController,
    private weatherService: CityWeatherService,
    private cepWeatherService: CepWeatherService
  ) {}

  ngOnInit() {
    this.openSearchModal();
  };

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
    if (event) {
      const { type, value } = event;
      this.query = value.trim();
      this.showModal = false; 
      if (type === 'cep') {
        this.fetchByCep(this.query);
      } else {
        this.fetchWeather(this.query);
      }
    } else {
      this.showModal = false;
    }
  }
  fetchWeather(city: string) {
   if(city) return;
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
       this.errorMessage = 'Cidade não encontrada.';
       this.loading = false;
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
        this.errorMessage = err.message || 'CEP não encontrado.';
        this.loading = false;
      },
    });
  };
};


