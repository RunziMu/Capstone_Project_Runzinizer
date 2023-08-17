import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { ReportComponent } from './components/report/report.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { IncomeFormComponent } from './components/income-form/income-form.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { EditTransactionFormComponent } from './components/edit-transaction-form/edit-transaction-form.component';
import { EditIncomeFormComponent } from './components/edit-income-form/edit-income-form.component';
import { IncomeComponent } from './components/income/income.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { NgApexchartsModule } from "ng-apexcharts";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    ReportComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    TransactionFormComponent,
    IncomeFormComponent,
    ExpenseComponent,
    EditTransactionFormComponent,
    EditIncomeFormComponent,
    IncomeComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

