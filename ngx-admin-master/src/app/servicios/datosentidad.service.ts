import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { environment } from '../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

const { apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class DatosentidadService {

  constructor(private httpClient :HttpClient) { }




  getDatosAll() {
    console.log('ingreso a servicio de entidad')
    return this.httpClient.get<any>(`${apiUrl}/datos_entidad/listaDatosEntidad`).toPromise();
  }

}


