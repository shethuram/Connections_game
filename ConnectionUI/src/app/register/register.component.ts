import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.minLength(7),
        Validators.pattern(/[^A-Za-z0-9]/) // At least one special character
      ]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const email = this.registerForm.value['Email'];
      this.userService.checkEmail(email).subscribe(
        (response:boolean)=> {
          if(response === true){
            this.toastr.error("Email already exists");
            this.registerForm.reset();
          }
          else{
            this.userService.registerUser(this.registerForm.value).subscribe(
              (response) => {
                this.toastr.success("Registration Success.Login with the Credentials")
                this.userService.registerScorer(this.registerForm.value).subscribe();     //scoretable also registered with details and default score as 0
                this.router.navigate(['/login']);
              },
              (error) => {
                this.registerForm.reset();
              }
            );


          }
        }
      )
      
    }
  }

}
