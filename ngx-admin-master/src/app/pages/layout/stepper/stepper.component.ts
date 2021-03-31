import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaniasService } from '../../../servicios/campanias.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation'
;
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
  providers: [CampaniasService]
})
export class StepperComponent implements OnInit {


  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  data:any;
  listaBolsas = []

  ///para graficas
  public barChartLabels: Label[] = ['1 hora', '15min', '22min', '30', '40', '15min', '22min', '30', '40', '15min', '22min', '30', '40'];
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

  getBolsas(){
    this.campaniaservice.obtenerBolsas2().subscribe(result => {
      this.bolsas = result
      console.log(result);

      for (const bolsa of this.bolsas) {

        this.dato = bolsa.bol_Valor.split(',');
        this.datos.push(this.dato);
        if (this.con < 1 ) {
          this.nombreBolsa.push(bolsa.bas_Cod)
        }
        this.con++;
      }
      console.log('Geet bolsa')
      console.log(this.datos)
      this.cargarDatos(this.datos, this.nombreBolsa);
    })
  }



  cargarDatos(datos, nombreBolsa ){
    this.barChartData = [];

       this.barChartData.push({ data: this.datos, label: nombreBolsa, yAxisID: 'y-axis-1'})
        console.log('barcharDta')
        console.log(this.barChartData);


    }


  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}],
              yAxes: [
                    {
                      id: 'y-axis-1',
                      position: 'right',

                    },
                    {
                    ticks: {
                      fontColor: 'red',
                      //para inicar la posicion desde cero
                      beginAtZero: true
                    }
                  }
      ]
    },
  };


    // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
      console.log(this.barChartData)
    }

    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

    public hideOne(): void {
      const isHidden = this.chart.isDatasetHidden(1);
      this.chart.hideDataset(1, !isHidden);
    }



  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  constructor(
              protected campaniaservice:CampaniasService,
              private route: ActivatedRoute
              ) {
                this.getBolsas();
  }




  ngOnInit() {
    console.log('inicio')
    // this.campaniaservice.obtenerBolsas().then(result => {
    //   this.listaBolsas = result
    //   //console.log(result)
    // })

    setTimeout(() => {
      // this.campaniaservice.obtenerBolsas().then(result => {
      //     this.listaBolsas = result
      //     //console.log(result)
      //   })
      this.getBolsas();
      this.chart.chart.update()
    },10000)

    console.log(this.chart.chart)

  }

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
