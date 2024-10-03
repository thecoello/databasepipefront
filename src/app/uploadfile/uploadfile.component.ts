import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidatorForm } from '../packages/validators';
import { NgFor, NgIf } from '@angular/common';
import { HttpService } from '../services/httpService';

@Component({
  selector: 'app-uploadfile',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './uploadfile.component.html',
  styleUrl: './uploadfile.component.css'
})
export class UploadfileComponent {
  
  file?:File
  errorMessage:Array<String> = []
  wasValidated: boolean = false
  validator: ValidatorForm = new ValidatorForm()
  loading: boolean = false
  fileUploaded: boolean = false
  fileFormData: FormData = new FormData()

  constructor(private httpService: HttpService) { }

  getContract(event: any){
    this.errorMessage = []
    const file = event.target.files[0]

    if(this.validator.fileType(file) && this.validator.fileSize(file, 10)){
      this.fileFormData.append('csvfile',event.target.files[0])
    }else{
 
      if(!this.validator.fileType(file)){
        this.errorMessage!.push('The file must be a CSV.')
        event.target.value = ''
      }
      
      if(!this.validator.fileSize(file, 10)){
        this.errorMessage!.push('The maximum file size allowed is 10mb.')
        event.target.value = ''
      }
    }

  }

  submit(){
    
    this.loading = true

    this.httpService.uploadFile(this.fileFormData).subscribe({
      next: (response)=>{
        console.log(response)
        this.fileUploaded = true
        this.loading = false
      },
      error: (error)=>{
        console.error(error)
      }
    })
  }
}