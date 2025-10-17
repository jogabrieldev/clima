import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
 
  {
    path: 'climate',
    loadComponent: () => import('./pages/climate/climate.page').then( m => m.ClimatePage)
  },
 
];
