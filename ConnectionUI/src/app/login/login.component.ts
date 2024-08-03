import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage!: string;

  constructor(private fb: FormBuilder,
    private router : Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/[^A-Za-z0-9]/) // At least one special character
      ]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const userfromForm  = this.loginForm.value;
      this.userService.checkEmailPassword(userfromForm).subscribe(
          (response:any) => {
            if (response && response.token) {
              this.toastr.success("Login Successful");
              localStorage.setItem('token', response.token); // Store the token in local storage
              this.userService.setEmail(userfromForm.email); // Store the email in the userService
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = 'Email or password is incorrect';
            }
          },
          (error: any) => {
            this.toastr.error('Login failed', error);
            this.errorMessage = 'Email or password is incorrect';
          }
        );

      
      
    
  }
}

}
