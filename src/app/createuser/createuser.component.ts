import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgFor, NgIf],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css'
})
export class CreateuserComponent implements OnInit {

  userForm?: FormGroup
  errors?:Array<String> = []
  loading?:Boolean = false
  responseOk?:Boolean = false

  constructor(private httpService: HttpService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
     this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usertype: ['', Validators.required],
    });
  }

  createUser(){

    this.errors = []
    
    if(this.userForm?.valid){

      this.loading = true

      this.httpService.createUser(this.userForm?.value).subscribe({
        next:(response)=>{
          setTimeout(() => {
            this.loading = false
            this.responseOk = true

          }, 1500);
        },
        error:(response)=>{

          this.userForm?.get('usertype')?.setValue('')

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
