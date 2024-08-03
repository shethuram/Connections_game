import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { MatButtonModule } from '@angular/material/button';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './services/guard/auth.guard';
import { RulesComponent } from './rules/rules.component';



export function tokenGetter() { 
  return localStorage.getItem("token"); 
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LeaderboardComponent,
    RegisterComponent,
    LoginComponent,
    FirstpageComponent,
    RulesComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    ToastrModule.forRoot(
      {
        positionClass:'toast-top-left'
      }
    ),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule, 
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })

  ],schemas: [CUSTOM_ELEMENTS_SCHEMA ],

  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
