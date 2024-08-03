import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { AuthGuard } from './services/guard/auth.guard';
import { RulesComponent } from './rules/rules.component';


const routes: Routes = [
  { path: '', redirectTo: '/firstpage', pathMatch: 'full' },
  { path: 'firstpage', component: FirstpageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path:'rules', component:RulesComponent},
  { path: 'home', component: HomeComponent , canActivate:[AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent ,canActivate:[AuthGuard]},
  { path: '**', redirectTo: '/home' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
