import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaniasService } from '../../../servicios/campanias.service';
import { Component, OnInit, ViewChild , OnDestroy, Input} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation'
;
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { type } from 'os';

@Component({
  selector: 'ngx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CampaniasService]
})
export class HomeComponent {

  @Input() enviarData

  imprimitE(){
    console.log(this.enviarData)
  }


  datosdelhijo
  datoenviarback:{bas_Id: string}

  private intervalUpdate: any = null;
  public chart3: any = null;

  bas_Nrefect;
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  enviarD: FormGroup;
  data:any;
  listaBolsas = [];
  tiempoventa = [];

  constructor(private hhtp: HttpClient, protected campaniaservice: CampaniasService) { }

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
  //rango de tiempo para mostrar en la grafica
  datotiempo = '';


//  selectData: {};
  ngOnInit(): void {

    this.chart3 = new Chart('realtime1',{
      type: 'line',
      data: {
        labels:[],
        datasets:[
          {
            label:' Data',
            // backgroundColor: '#168ede',
            borderColor:'#32cd32'
          }
        ],
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend:{
          display: true,
          position: 'bottom',
          labels:{
            fontColor: 'white'
          }
        },
        scales:{
          yAxes:[{
            ticks: {
              fontColor:'white',
              beginAtZero: true
            }
          }],
          xAxes:[{
            ticks:{
              fontColor:'white',
              beginAtZero:true
            }
          }]
        }
      }
    });

    this.getBolsas2(this.datotiempo);

    this.intervalUpdate = setInterval(function(){
      this.getBolsas2();
    }.bind(this),5000)
  }


  private ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.intervalUpdate);
  }

  elegirrango(datotime){

     this.datotiempo = datotime;

    if (datotime === '1') {
      //segundos
      this.datotiempo = '30'
       return this.datotiempo;
    }
    if (datotime === '2') {
      // 30 minutos
      this.datotiempo = '500'
       return this.datotiempo ;
    }
    if (datotime === '3') {
      //1 horas
      this.datotiempo = '1000'
       return this.datotiempo ;
    }
    if (datotime === '4') {
      //1 día
      this.datotiempo = '2500'
      return this.datotiempo ;
    }

  }


  getBolsas2(datotime){

    this.datotiempo = datotime;
    this.datosdelhijo = this.enviarData
    console.log('enviarData ' + this.enviarData)

    console.log('Home ' + this.datosdelhijo)

    console.log(typeof(this.datosdelhijo))

    this.campaniaservice.obtenerBolsas2(this.datosdelhijo).then(result => {



      this.bolsas = result
      // console.log(result);


      // console.log('Tiempo de grafica ' + this.datotiempo)

      let chartTime: any = new Date()
      for (const bolsa of this.bolsas) {
          chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes()<10) ?'0' + chartTime.getMinutes(): chartTime.getMinutes())+ ':' + ((chartTime.getSeconds()<10)?'0' + chartTime.getSeconds() : chartTime.getSeconds());

          this.dato = bolsa.bolsaValor.split(',');
          // this.chart3.data.labels.push(this.dato);
          if (this.chart3.data.labels.length > this.datotiempo) {
            this.chart3.data.labels.shift();
            this.chart3.data.datasets[0].data.shift();
          }
          this.chart3.data.labels.push(chartTime);
          this.chart3.data.datasets[0].data.push(this.dato);
          this.chart3.update();

          if (this.con < 1) {
            this.nombreBolsa.push(bolsa.bolsaCodigo)
          }
          // this.tiempoventa.push(bolsa.bolsaTime)
          this.con++;
          // console.log('Geet bolsa')
          // console.log(this.datos)
          // this.cargarDatos(this.chart3.data.datasets, this.nombreBolsa);
        }



        // for (const bolsa of this.bolsas) {

        //   this.dato = bolsa.bolsaValor.split(',');
        //   // this.chart3.data.labels.push(this.dato);
        //   if (this.chart3.data.labels.length > 25) {
        //     this.chart3.data.labels.shift();
        //     this.chart3.data.datasets[0].data.shift();
        //   }
        //   this.chart3.data.labels.push(chartTime);
        //   this.chart3.data.datasets[0].data.push(this.dato);
        //   this.chart3.update();

        //   if (this.con < 1) {
        //     this.nombreBolsa.push(bolsa.bolsaCodigo)
        //   }
        //   // this.tiempoventa.push(bolsa.bolsaTime)
        //   this.con++;
        //   // console.log('Geet bolsa')
        //   // console.log(this.datos)
        //   // this.cargarDatos(this.chart3.data.datasets, this.nombreBolsa);
        // }



    },)
  }


  cargarDatos(datos, nombreBolsa ){
    this.barChartData = [];

     let chartTime: any = new Date();
     chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
      if (this.barChartData.length > 15) {
        this.barChartData.shift();
        this.barChartLabels.shift();
      }
      this.barChartLabels.push(chartTime);
      this.barChartData.push({ data: this.datos, label: nombreBolsa})
        console.log('barcharDta')
        console.log(this.barChartData);


    }



    selectData(){

    }


}
