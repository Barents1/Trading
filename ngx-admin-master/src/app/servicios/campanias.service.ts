import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { stringify } from '@angular/compiler/src/util';

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

obtenerBolsas2(bas_Id){
  console.log('ingreso a serive 2 ' + bas_Id)
  return this.httpClient.get<any>(`${apiUrl}/bolsa/listaDataBolsa/${bas_Id}`,bas_Id).toPromise();
}


getDatosBolsa(model): Observable<any>{

  return this.httpClient.get(`${apiUrl}/bolsa/listaDataBolsa`,model);
}



}
