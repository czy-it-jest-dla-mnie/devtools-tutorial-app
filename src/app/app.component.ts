import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-app-dev-tools-tutorial';
  
  constructor(private http: HttpClient) { }

  public numbers = {
    number1: 0,
    number2: 0
  }

  public result = 0;
  public amountInEuro = 0;
  public exchangeRate = 0;
  public amount = 0;

  public localStorageInput = "";
  public localStorageValue: string | null = "";

  public calculateEx(): void {
    this.getPlnEuroRate()
    .subscribe((data: ExchangeRateResponse) => {
      console.log(data);
      this.amountInEuro = data.result;
      this.exchangeRate = data.info.rate;
    });
  }

  getPlnEuroRate() {
    var requestHeaders = new Headers();
    requestHeaders.append("apikey", "x7S5ruVizJIC0pl65uffaytoTjbC0Jqg");

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })};

    httpOptions.headers = httpOptions.headers.set('apikey', 'x7S5ruVizJIC0pl65uffaytoTjbC0Jqg');

    return this.http.get<ExchangeRateResponse>(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=PLN&amount=${this.amount}`, httpOptions);
  }

  addToLocalStorage(): void {
    localStorage.setItem('localStorageInput', this.localStorageInput);
  }

  getLocalStorageValue() {
    this.localStorageValue = localStorage.getItem('localStorageInput');
  }

  public onSubmit(): void {
    let a = 4;
    let b = 2;
    let result2 = a + b;
    console.log("Dodaje dwie liczby: ")
    console.log('Liczba A: ' + this.numbers.number1)
    console.log('Liczba B: ' + this.numbers.number2)
    this.result = this.numbers.number1 + this.numbers.number2 ;
    console.log('Wynik dodawania: ' + this.result)
  }

}

export interface ExchangeRateResponse {
  date: string;
  info: ExchangeRateInfo;
  result: number;
  success: boolean;
}

export interface ExchangeRateInfo {
  rate: number;
}
