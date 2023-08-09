import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ReportComponent } from './components/report/report.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthguardService } from './services/authguard.service';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { IncomeFormComponent } from './components/income-form/income-form.component';
import { ExpenseComponent } from './components/expense/expense.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthguardService] },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
  { path: 'search', component: SearchComponent, canActivate: [AuthguardService] },
  { path: 'report', component: ReportComponent, canActivate: [AuthguardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'transaction-form', component: TransactionFormComponent },
  { path: 'add-expense', component: TransactionFormComponent },
  { path: 'add-income', component: IncomeFormComponent },
  { path: 'edit-expense', component: TransactionFormComponent },
  { path: 'view-expense', component: ExpenseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
