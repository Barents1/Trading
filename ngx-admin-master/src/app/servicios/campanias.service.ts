import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class CampaniasService {

constructor(private httpClient :HttpClient){

}

obtenerBolsas(){
  console.log('ingreso a serive')
  return this.httpClient.get<any>(`${apiUrl}/bolsa/listaDataBolsa`).toPromise();
}

obtenerBolsas2(){
  console.log('ingreso a serive')
  return this.httpClient.get(`${apiUrl}/bolsa/listaDataBolsa`);
}


}
