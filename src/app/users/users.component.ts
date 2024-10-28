import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService';
import { User } from '../models/user';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: Array<User> = []
  url: string = '/users'
  prevPage?: string
  nextPage?: string

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getData()
  }

  setPrevPage() {
    this.url = this.prevPage!
    this.getData()
  }

  setNextPage() {
    this.url = this.nextPage!
    this.getData()
  }

  deleteUser(email:string, id:number){

    const setNewPasswordConfirm = confirm(`Please, confirm that you want to DELETE the user: [[${email}]]`)

    if(setNewPasswordConfirm){

      this.httpService.deleteUser(id!).subscribe({
        next:(response)=>{
          alert(`The user [[${email}]] has been deleted`)
          location.reload()
        },
        error:()=>{
          alert(`An error occurred while trying to delete the user.`)
        }
      })

    }

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

  getData() {

    this.users = []

    this.httpService.getUsers(this.url).subscribe({
      next: (response) => {

        if (response.prev_page_url != null) {
          this.prevPage = `/${response.prev_page_url.split('/').slice(-1)[0]}`
        }

        if (response.next_page_url) {
          this.nextPage = `/${response.next_page_url.split('/').slice(-1)[0]}`
        }
        
        response.data.forEach((user: User) => {
          this.users.push(user)
        });

      },
      error: (response) => {

      }
    })
  }



}
