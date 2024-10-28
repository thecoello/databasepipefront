import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgFor, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm?: FormGroup
  errors?:Array<String> = []
  loading?:Boolean = false
  responseOk?:Boolean = false

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
     this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(){

    this.errors = []
    
    if(this.loginForm?.valid){

      this.loading = true

      this.httpService.login(this.loginForm?.value).subscribe({
        next:(response)=>{

          localStorage.setItem('token',response.token)
          localStorage.setItem('userid',response.user_id)

          if(localStorage.getItem('token') && localStorage.getItem('userid')){
            window.location.reload()
          }
        },
        error:(response)=>{

          this.loginForm?.get('usertype')?.setValue('')

          for (const key in response.error) {
            this.errors?.push(response.error[key])
          }

          setTimeout(() => {
            this.loading = false
          }, 1500);

        }
      })
    }

  }
}
