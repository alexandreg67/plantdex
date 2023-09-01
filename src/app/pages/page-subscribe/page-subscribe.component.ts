import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css']
})
export class PageSubscribeComponent {

  constructor(private formBuilder: FormBuilder) {}

    submitForm: FormGroup = this.formBuilder.group({
 
    nom: ['', [Validators.required ]],
 
    prenom: ['', [Validators.required]],
 
    email: ['', [Validators.required]],
 
    password: [0, [Validators.required]],
    
    repeatPassword: [0, [Validators.required]],
  });


  submit() {

    console.log("submit form plant", this.submitForm.value);
  
    
  }

}
