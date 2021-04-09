import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaniasService } from '../../../servicios/campanias.service';
import { Component, OnInit, ViewChild , OnDestroy} from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { ActivatedRoute } from '@angular/router';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
  providers: [CampaniasService]
})
export class StepperComponent {

  private intervalUpdate: any = null;
  public chart2: any = null;
  public chart3: any = null;


  private ngOnInit(): void{

    this.intervalUpdate = setInterval(function(){
      // this.showDatos();
    }.bind(this), 50);


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


    this.getBolsas2();

    this.intervalUpdate = setInterval(function(){
      this.getBolsas2();
    }.bind(this),5000)

  }

  private ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    clearInterval(this.intervalUpdate);
  }



  // private showDatos():void{
  //   this.getDatos().subscribe(response => {
  //     if(response.e === false){
  //       let chartTime: any = new Date();
  //       chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes()<10) ?'0' + chartTime.getMinutes(): chartTime.getMinutes())+ ':' + ((chartTime.getSeconds()<10)?'0' + chartTime.getSeconds() : chartTime.getSeconds());
  //       if(this.chart2.data.labels.length > 15){
  //         this.chart2.data.labels.shift();
  //         this.chart2.data.datasets[0].data.shift();
  //       }
  //       this.chart2.data.labels.push(chartTime);
  //       this.chart2.data.datasets[0].data.push(response.data);
  //       this.chart2.update();
  //     }else{
  //       console.log('Error: Thee resultado tiene un error')
  //     }
  //   }, error => {
  //     console.log('Error: Error inesperado')
  //   });
  // }

  private getDatos(): Observable<any>{
    return this.http.get('http://localhost:8090',
    {responseType: 'json'})
  }


  getBolsas2(){
    // this.campaniaservice.obtenerBolsas2().subscribe(result => {
      const model = 1750;
    this.campaniaservice.obtenerBolsas2(model).then(result => {
      this.bolsas = result
      console.log(result);
      let chartTime: any = new Date()
      chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes(): chartTime.getMinutes())+ ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());

      for (const bolsa of this.bolsas) {

        this.dato = bolsa.bolsaValor.split(',');
        // this.chart3.data.labels.push(this.dato);
        if (this.chart3.data.labels.length > 15) {
          //para resetear la longitud de labels
          this.chart3.data.labels.shift();
          this.chart3.data.datasets[0].data.shift();
        }
        this.chart3.data.labels.push(chartTime);
        this.chart3.data.datasets[0].data.push(this.dato);

        if (this.con < 1) {
          this.nombreBolsa.push(bolsa.bolsaCodigo)
        }
        // this.tiempoventa.push(bolsa.bolsaTime)
        this.con++;
      }

      this.chart3.data.datasets[0].data.push(this.dato);

      console.log('Geet bolsa')
      console.log(this.datos)
      // this.cargarDatos(this.chart3.data.datasets, this.nombreBolsa);
      this.chart3.update();
    },)
  }





  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  data:any;
  listaBolsas = [];
  tiempoventa = [];
  private nombreBolsa = [];
  private bolsas;
  private dato: string ;
  private datos = [] ;

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

 private con = 0;

  // getBolsas(){
  //   this.campaniaservice.obtenerBolsas2().subscribe(result => {
  //     this.bolsas = result
  //     console.log(result);

  //     for (const bolsa of this.bolsas) {

  //       this.dato = bolsa.bolsaValor.split(',');
  //       this.datos.push(this.dato);
  //       if (this.con < 1 ) {
  //         this.nombreBolsa.push(bolsa.bolsaCodigo)
  //       }
  //       this.tiempoventa.push(bolsa.bolsaTime)
  //       this.con++;
  //     }
  //     console.log('Geet bolsa')
  //     console.log(this.datos)
  //     this.cargarDatos(this.datos, this.nombreBolsa);
  //   },)
  // }



  // cargarDatos(datos, nombreBolsa ){
  //   this.barChartData = [];

  //    let chartTime: any = new Date();
  //    chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
  //     if (this.barChartData.length > 15) {
  //       this.barChartData.shift();
  //       this.barChartLabels.shift();
  //     }
  //     this.barChartLabels.push(chartTime);
  //     this.barChartData.push({ data: this.datos, label: nombreBolsa})
  //       console.log('barcharDta')
  //       console.log(this.barChartData);
  //       this.chart3.update();

  //   }


  // // public barChartOptions: ChartOptions = {
  // //   responsive: true,

  // //   // We use these empty structures as placeholders for dynamic theming.
  // //   scales: { xAxes: [{}],
  // //             yAxes: [
  // //                   {
  // //                     id: 'y-axis-1',
  // //                     position: 'right',

  // //                   },
  // //                   {
  // //                   ticks: {
  // //                     // fontColor: 'red',
  // //                     //para inicar la posicion desde cero
  // //                     beginAtZero: true
  // //                   }
  // //                 }
  // //     ]
  // //   },
  // // };


  //   // events
  //   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //     console.log(event, active);
  //     console.log(this.barChartData)
  //   }

  //   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  //     console.log(event, active);
  //   }

  //   public hideOne(): void {
  //     const isHidden = this.chart.isDatasetHidden(1);
  //     this.chart.hideDataset(1, !isHidden);
  //     this.chart.update();
  //   }



    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
              protected campaniaservice:CampaniasService,
              private route: ActivatedRoute,
              private http: HttpClient
              ) {
                // this.getBolsas();
  }



  // ngOnInit() {
  //   console.log('inicio')
  //   // this.campaniaservice.obtenerBolsas().then(result => {
  //   //   this.listaBolsas = result
  //   //   //console.log(result)
  //   // })

  // }


  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(0,0,0,0)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];








}
