import { Component ,Output, EventEmitter } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { sunnyOutline, cloudOutline, umbrellaOutline } from 'ionicons/icons';


interface state {
  name:string;
  uf:string;
  capital:string;
}

@Component({
  selector: 'app-weather-search-modal',
  templateUrl: './weather-search-modal.component.html',
  styleUrls: ['./weather-search-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class WeatherSearchModalComponent {
  public query: string = '';
  public searchType: string ="cep";
  @Output() onSearch = new EventEmitter<any>();

  public states: state[] = [
   { name: 'Acre', uf: 'AC', capital: 'Rio Branco' }, { name: 'Alagoas', uf: 'AL', capital: 'Maceió' },
   { name: 'Amapá', uf: 'AP', capital: 'Macapá' }, { name: 'Amazonas', uf: 'AM', capital: 'Manaus' },
   { name: 'Bahia', uf: 'BA', capital: 'Salvador' }, { name: 'Ceará', uf: 'CE', capital: 'Fortaleza' },
   { name: 'Distrito Federal', uf: 'DF', capital: 'Brasília' }, { name: 'Espírito Santo', uf: 'ES', capital: 'Vitória' },
   { name: 'Goiás', uf: 'GO', capital: 'Goiânia' }, { name: 'Maranhão', uf: 'MA', capital: 'São Luís' },
   { name: 'Mato Grosso', uf: 'MT', capital: 'Cuiabá' }, { name: 'Mato Grosso do Sul', uf: 'MS', capital: 'Campo Grande' },
   { name: 'Minas Gerais', uf: 'MG', capital: 'Belo Horizonte' }, { name: 'Pará', uf: 'PA', capital: 'Belém' },
   { name: 'Paraíba', uf: 'PB', capital: 'João Pessoa' }, { name: 'Paraná', uf: 'PR', capital: 'Curitiba' },
   { name: 'Pernambuco', uf: 'PE', capital: 'Recife' }, { name: 'Piauí', uf: 'PI', capital: 'Teresina' },
   { name: 'Rio de Janeiro', uf: 'RJ', capital: 'Rio de Janeiro' }, { name: 'Rio Grande do Norte', uf: 'RN', capital: 'Natal' },
   { name: 'Rio Grande do Sul', uf: 'RS', capital: 'Porto Alegre' }, { name: 'Rondônia', uf: 'RO', capital: 'Porto Velho' },
   { name: 'Roraima', uf: 'RR', capital: 'Boa Vista' }, { name: 'Santa Catarina', uf: 'SC', capital: 'Florianópolis' },
   { name: 'São Paulo', uf: 'SP', capital: 'São Paulo' }, { name: 'Sergipe', uf: 'SE', capital: 'Aracaju' },
   { name: 'Tocantins', uf: 'TO', capital: 'Palmas' }
  ];
  

  constructor(private modalCtrl: ModalController,) {
    addIcons({
      'sunny-outline': sunnyOutline,
      'cloud-outline': cloudOutline,
      'rainy-outline': umbrellaOutline 
    });
  }

  changeSearchType() {
    this.query = '';
  }

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
  onCepInput(event: any) {
   let value = event.target.value;
   value = value.replace(/\D/g, '');
    if (value.length > 5) {
     value = value.replace(/^(\d{5})(\d{1,3}).*/, '$1-$2');
    }
    this.query = value;
   event.target.value = value;
  }
}
