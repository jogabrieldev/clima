# ClimateApp - Aplicativo de Clima com Ionic e Angular

ClimateApp é um aplicativo web desenvolvido com **Ionic 7** e **Angular 20**, que permite consultar o clima atual de uma cidade no Brasil. O app integra serviços de clima via **OpenWeather API** E **WeatherAPI** e busca de CEP via **ViaCEP**, com interface moderna, responsiva e interativa.


## 🛠️ Tecnologias utilizadas

- **Framework:** [Ionic 7](https://ionicframework.com/) + Angular 20 (Standalone Components)  
- **Linguagem:** TypeScript  
- **HTML**
- **CSS:** SCSS com design responsivo  
- **Serviços Web:**
 - [wetherAPI](https://www.weatherapi.com/) WeatherAPI (clima por cidade) 
  - [OpenWeather API](https://openweathermap.org/api) → clima em tempo real
  - [ViaCEP](https://viacep.com.br/) → busca de CEP no Brasil
- **Outros:**    
  - Proxy para evitar CORS ao consultar CEP localmente  
  - Ionic Components: ion-card, ion-input, ion-radio, ion-grid, etc.  


## 🌟 Funcionalidades

- **Busca de clima por cidade**
  - Utiliza o serviço `CityWeatherService` com a API **WeatherAPI.com**.
  - Busca diretamente pelo nome da cidade.
  - Retorna temperatura, descrição, ícone, umidade e vento.

- **Busca de clima por CEP**
  - Utiliza o serviço `CepWeatherService` com **OpenWeatherMap API** + **ViaCEP**.
  - Consulta o CEP, obtém cidade e estado, e busca o clima baseado nisso.
  - Necessita configuração de **proxy** para evitar CORS.

- **Modal de busca**
  - Input flutuante para cidade ou CEP.
  - Radio buttons para escolher o tipo de busca.

- **Exibição de dados**
  - Card centralizado mostrando temperatura, descrição, ícone do clima, umidade e vento.
  - Layout responsivo para desktop e mobile.

- **Botões utilitários**
  - Reload → recarrega os dados do clima.
  - Voltar → volta para a página anterior.


_*MELHORIAS PARA O PROJETO*

**Adicionar notificações mais claras para o usuário como um toast**.

**Permitir armazenar a busca que esta sendo feita por um determinado tempo**

**Adicionar novos meios de busca para o usuário**

**Permitir o usuário estilizar seu cenario onde vai esta sendo feita a busca e tendo as resposta**

**Parametrizar as cidades e estados que a pesquisa vai ser bem sucedida, caso o usuário digitar uma cidade não valida mostra um erro**
## 🚀 Como rodar o projeto

*E preciso ter as APIs Key para que os services fucione e busque os climas*

[https://openweathermap.org/]

[https://www.weatherapi.com/]


*Monte Sua variaveis de ambiente no arquivo enverimoent*

(Importe o repositorio)

1. **Instalar dependências**

```bash
npm install

(Rodar projeto)
ionic serve 
OU
ng serve

