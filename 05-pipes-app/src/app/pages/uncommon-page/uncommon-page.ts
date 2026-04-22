import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, tap } from 'rxjs';

const client1 = {
  name: 'Diego',
  gender: 'male',
  age: 30,
  address: 'Vigo, Galicia, Spain'
}

const client2 = {
  name: 'Carolina',
  gender: 'female',
  age: 28,
  address: 'Caracas, Venezuela'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [Card, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {
  //i18n select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient(): void {
    this.client.set(this.client() === client1 ? client2 : client1);
  }

  //i18n plural
  clients = signal([
    'Maria',
    'Pedro',
    'Juan',
    'Ana',
    'Luis'
  ]);

  clientsMap = signal({
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    other: 'tenemos # clientes esperando.'
  });

  deleteClient(): void {
    this.clients.update((prev) => prev.slice(1));
  }

  //KeyValue pipe
  profile = signal({
    name: 'Diego',
    age: 30,
    address: 'Vigo, Galicia, Spain'
  });


  //Async Pipe
  promiseValue = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Tenemos datos en la promesa.');
      console.log('Promesa resuelta');
    }, 3500);
  });

  myObservableTimer = interval(2000)
  .pipe(tap(value => console.log('Valor del observable:', value)));
}
