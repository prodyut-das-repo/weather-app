import { Component, OnInit } from '@angular/core';
import { WeatherService } from './service/weather.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  weatherForecastData: any;
  errorMessage = '';
  location: string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  loader = false;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Highest Temperature' },
    { data: [], label: 'Lowest Temperature' }
  ];
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.onSubmit('London');
  }

  /**
   * Determines whether submit on
   * @param cityName 
   */
  onSubmit(cityName: string) {
    if (cityName) {
      this.barChartData = [{ data: [], label: 'Highest Temperature' },
      { data: [], label: 'Lowest Temperature' }];
      this.loader = true;
      this.weatherService.getWeatherForecast(cityName).subscribe(data => {
        this.weatherForecastData = data;
        this.day1 = this.findDay(new Date((this.weatherForecastData.list[2].dt) * 1000).getDay());
        this.day2 = this.findDay(new Date((this.weatherForecastData.list[10].dt) * 1000).getDay());
        this.day3 = this.findDay(new Date((this.weatherForecastData.list[20].dt) * 1000).getDay());
        this.day4 = this.findDay(new Date((this.weatherForecastData.list[30].dt) * 1000).getDay());
        data = {
          "Day1": {
            "Highest Temperature": this.weatherForecastData.list[2].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[2].main.temp_min
          },
          "Day2": {
            "Highest Temperature": this.weatherForecastData.list[10].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[10].main.temp_min
          },
          "Day3": {
            "Highest Temperature": this.weatherForecastData.list[20].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[20].main.temp_min
          },
          "Day4": {
            "Highest Temperature": this.weatherForecastData.list[30].main.temp_max,
            "Lowest Temperature": this.weatherForecastData.list[30].main.temp_min
          }
        };
        console.log(data);

        this.barChartLabels = Object.keys(data);
        this.barChartLabels.forEach(label => {
          this.barChartData[0].data.push(data[label]['Highest Temperature']);
          this.barChartData[1].data.push(data[label]['Lowest Temperature']);
        });
      }, error => {
        this.loader = false;
        this.location = '';
        this.errorMessage = `${cityName} is not covered, please enter another city or try again`;
      }
        , () => {
          this.location = '';
          this.loader = false;
          this.errorMessage = '';
        });
    }
  }

  findDay(weekday: number) {
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return dayName[weekday];
  }

  // chart
  // public barChartLabels = [this.day1,this.day2,this.day3,this.day4];
  // public barChartType = 'bar';
  // public barChartLegend = true;
  // public barChartData = [
  //   { data: [65, 59, 80, 60, 50], label: 'Highest Temperature' },
  //   { data: [28, 48, 40, 81], label: 'Lowest Temperature' }
  // ];
  // public barChartOptions1 = {
  //   options: {
  //     title: {
  //       display: true,
  //       text: 'Weather Chart'
  //     },
  //     scales: {
  //       xAxes: [{
  //         position: 'bottom',
  //         gridLines: {
  //           zeroLineColor: "rgba(0,255,0,1)"
  //         },
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'x axis'
  //         },
  //         stacked: true
  //       }],
  //       yAxes: [{
  //         position: 'left',
  //         gridLines: {
  //           zeroLineColor: "rgba(0,255,0,1)"
  //         },
  //         scaleLabel: {
  //           display: true,
  //           labelString: 'y axis'
  //         }
  //       }]
  //     }
  //   }
  // };
}
