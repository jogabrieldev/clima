import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ValidadeInputService {

   validateCep(cep: string): boolean {
     if (!cep) return false;
     const cleanCep = cep.replace(/\D/g, ''); 
     const regexCep = /^[0-9]{8}$/;
     return regexCep.test(cleanCep);
   }

    validateCity(city: string): boolean {
     if (!city) return false;
     return city.trim().length >= 3;
    }
}