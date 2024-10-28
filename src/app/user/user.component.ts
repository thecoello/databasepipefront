import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgFor, NgIf],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user:User = new User()
  userForm?: FormGroup
  errors?: Array<String> = []
  loading?: Boolean = false
  responseOk?: Boolean = false
  id?: number

  constructor(private httpService: HttpService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe({
      next: (e) => {
        this.id = e['id']
        if(this.id){
          this.getUser()
        }else{
          this.router.navigateByUrl('/')
        }
      },
    })

    this.userForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      usertype: [this.user.usertype, Validators.required],
    });
  }

  getUser(){

    this.httpService.getUser(this.id!).subscribe({
      next:(response)=>{
        this.user = response

        this.userForm?.get('name')?.setValue(this.user.name)
        this.userForm?.get('email')?.setValue(this.user.email)
        this.userForm?.get('usertype')?.setValue(this.user.usertype)

      }
    })
  }

  setNewPassword(email:string, id:number){

    const setNewPasswordConfirm = confirm(`Please, confirm that you want to UPDATE the password for the email [[${email}]]`)

    if(setNewPasswordConfirm){

      this.httpService.setNewPassword(id!).subscribe({
        next:(response)=>{
          alert(`The Password for the email [[${response.email}]] has been updated, an email with the new password has been sent to this email address`)
        },
        error:()=>{
          alert(`An error occurred while trying to update the password, please try again later.`)
        }
      })

    }

  }

  updateUser() {

    this.errors = []

    if (this.userForm?.valid) {

      this.loading = true

      this.httpService.updateUser(this.userForm?.value, this.id!).subscribe({
        next: (response) => {
          setTimeout(() => {
            this.loading = false
            this.responseOk = true

            setTimeout(() => {
              location.reload()
            }, 500);

          }, 1500);
        },
        error: (response) => {

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
