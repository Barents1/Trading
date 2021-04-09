import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaniasService } from '../../../servicios/campanias.service';
import { DatosentidadService } from '../../../servicios/datosentidad.service'
import { Component, OnInit, ViewChild , OnDestroy, Input} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-earning-card',
  styleUrls: ['./earning-card.component.scss'],
  templateUrl: './earning-card.component.html',
})
export class EarningCardComponent implements OnInit {
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  data:any;
  listaBolsas = [];
  listaEntidad = [];
  tiempoventa = [];
  nombreEntidad =[];

  @Input() data1: {
    idcarrera: string,
    idsede: string,
    idmodalidad: string,
    descripcion: string,
    estado: number
  };

  ///para graficas
  public barChartLabels: Label[] = this.tiempoventa;
  //Tipo de grafico que queremos: ejem: line, bar, radar
  public barChartType: ChartType = 'line';
  public barChartLegend = true;
  public barChartPlugins  = [pluginAnnotations];
  //Datos que vamos a cargar en las graficas
  public barChartData: ChartDataSets[];
  public barChartDataLabels: ChartDataSets[];
  public chartColors;

  private bolsas;
  private dato: string ;
  //Arreglo de los datos que vamos a pasar
  private datos = [] ;
  private datosE;
  //Arreglo de las categorias que vamos a pasar
  private nombreBolsa = [];

  //Arreglo de los colores que vamos a pasar
  private colores = ['#1449a9'];
 private con = 0;
 enviarID:{
  bas_Id: number,
  entf_Id: number,
  entf_Deta: string,
  cam_Id: string,
  bas_Cod: string,
}
  flipped = false;


  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private datosentidadService:DatosentidadService) {

    }


  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('inicio')
    this.datosentidadService.getDatosAll().then(result => {
      this.listaEntidad = result
      console.log('resultado entidad' + result)
    })




      // this.campaniaservice.getDatosAll().subscribe(result => {
      //   this.bolsas = result
      //   console.log(result);

      //   for (const bolsa of this.b  olsas) {

      //     this.dato = bolsa.bolsaValor.split(',');
      //     this.datos.push(this.dato);
      //     if (this.con < 10 ) {
      //       this.nombreEntidad.push(bolsa.entf_Deta)
      //     }
      //     this.tiempoventa.push(bolsa.bolsaTime)
      //     this.con++;
      //   }

      // },)
    }

    prueba(EnviarID){
      this.enviarID = EnviarID.bas_Id
      console.log('entreooo', EnviarID)
    }



  toggleView() {
    this.flipped = !this.flipped;
  }







    // cargarDatos(datos, nombreBolsa ){
    //   this.barChartData = [];

    //    let chartTime: any = new Date();
    //    chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
    //     if (this.barChartData.length > 15) {
    //       this.barChartData.shift();
    //       this.barChartLabels.shift();
    //     }
    //     this.barChartLabels.push(chartTime);
    //     this.barChartData.push({ data: this.datos, label: nombreBolsa});


    //   }






}
