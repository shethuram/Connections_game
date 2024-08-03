import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  constructor(private router: Router,private jwtHelper: JwtHelperService,private userService: UserService) {}

  isLogin= false;
  ngOnInit(): void {
    this.userService.sharedVariable$.subscribe( (v) =>{
         if(v !==''){
          this.isLogin = true;
         }
         else{
          this.isLogin = false;
         }
    });
  }
  @ViewChild('sidenav') sidenav!: MatSidenav;

  logout(): void {
    // Add your logout logic here, e.g., clearing session data
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
    this.userService.setEmail('');
  }
  
}
