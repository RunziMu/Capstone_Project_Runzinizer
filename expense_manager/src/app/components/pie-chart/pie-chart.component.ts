import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/services/expense.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements OnInit {
  public chart: any;
  private chartInfo: any;
  private labeldata: any[] = [];
  private realdata: any[] = [];
  private colordata: any[] = [];
  constructor(private expenseService: ExpenseService) { }
  ngOnInit(): void {
    this.expenseService.getExpense().subscribe((response) => {
      this.chartInfo = response;
      if (this.chartInfo != null) {
        for (let i = 0; i < this.chartInfo.length; i++) {
          this.labeldata.push(this.chartInfo[i].year);
          this.realdata.push(this.chartInfo[i].amount);
          this.colordata.push(this.chartInfo[i].colorcode);
        }
        this.createChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }
  createChart(labeldata: any, realdata: any, colordata: any) {
    this.chart = new Chart("MyChart", {
      type: 'doughnut',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: "No of sales",
            data: realdata,
            backgroundColor: colordata,
          },
        ]
      },
      options: {
        aspectRatio: 2,
      }
    });
  }
}

