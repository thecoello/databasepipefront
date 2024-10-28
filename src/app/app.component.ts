import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HttpService } from './services/httpService';
import { User } from './models/user';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, TitleCasePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Database Filter View';
  id = localStorage.getItem('userid')
  token = localStorage.getItem('token')?.split(' ')[1]
  user:User = new User()

  constructor(private httpService: HttpService, private route: ActivatedRoute, private router: Router) { 

}

  ngOnInit(): void {
    if(!this.id || !this.token){
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      this.router.navigate(['/'])
    }else{
      this.getUser()
    }
  }

  manageUrl(){

      location.pathname.replace('/','') == ('uploadfile') && this.user.usertype != 'ADMIN' ? this.router.navigate(['/filterdata']) : null
      location.pathname.replace('/','') == ('users') && this.user.usertype != 'ADMIN' ? this.router.navigate(['/filterdata']) : null
      location.pathname.replace('/','') == ('createuser') && this.user.usertype != 'ADMIN' ? this.router.navigate(['/filterdata']) : null
      location.pathname.replace('/','') == ('') && this.id && this.token ? this.router.navigate(['/filterdata']) : null
      location.pathname.replace('/','') == ('filterdata') && !this.id && !this.token ? this.router.navigate(['/']) : null
      location.pathname.includes('/user/') && !this.id && !this.token ? this.router.navigate(['/']) : null
 
  }

  getUser() {
    if (this.token && this.id)
      this.httpService.getUser(parseInt(this.id)).subscribe({
        next: (response) => {
          this.user = response
          this.manageUrl()
        },error: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('userid')
          this.router.navigate(['/'])
        }
      })
  }

  logOut(){

    const confirmLogout = confirm('Are you sure you want to logout?')

    if(confirmLogout){
      this.httpService.logout().subscribe({
        next: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('userid')
          location.reload()
        }
      })
    }

  }

}
