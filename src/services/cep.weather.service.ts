import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
//SERVICE BUSCAR POR CEP E PEGAR CLIMA

@Injectable({ providedIn: 'root' })
export class CepWeatherService {

  private weatherApiKey = environment.OPENWEATHER_KEY
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private viaCepUrl = '/viacep/ws';

  constructor(private http: HttpClient) {}

  getWeatherByCep(cep: string): Observable<any> {
    
    const cleanCep = cep.replace(/\D/g, '');
    const urlCep = `${this.viaCepUrl}/${cleanCep}/json/`;

    return this.http.get<any>(urlCep).pipe(
      switchMap((cepData) => {
        if (!cepData || !cepData.localidade) {
          return throwError(() => new Error('CEP não encontrado'));
        }

        const city = cepData.localidade;
        const state = cepData.uf; 
        const query = `${city},${state},BR`; 
        const urlWeather = `${this.weatherApiUrl}?q=${encodeURIComponent(query)}&appid=${this.weatherApiKey}&units=metric&lang=pt`;

        return this.http.get<any>(urlWeather);
      }),
      catchError((err) => throwError(() => new Error(err.message || 'Erro ao buscar clima pelo CEP')))
    );
  };
};

