import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-subscribe',
  templateUrl: './page-subscribe.component.html',
  styleUrls: ['./page-subscribe.component.css']
})
export class PageSubscribeComponent {

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

    submitForm: FormGroup = this.formBuilder.group({
 
    nom: ['', [Validators.required ]],
 
    prenom: ['', [Validators.required]],
 
    email: ['', [Validators.required]],
 
    password: [0, [Validators.required]],
    
    repeatPassword: [0, [Validators.required]],
  });


  submit() {
    const newUser: User = this.submitForm.value;
    this.userService.createUser(newUser).subscribe(() => {
          console.log("mise à jour effectué");
        })

    console.log("submit form user", this.submitForm.value);
    this.submitForm.reset();
    
  }
  
}
