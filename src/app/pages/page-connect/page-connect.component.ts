import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-connect',
  templateUrl: './page-connect.component.html',
  styleUrls: ['./page-connect.component.css']
})
export class PageConnectComponent {

  constructor(private formBuilder: FormBuilder, private userService: UserService) {}

    loginForm: FormGroup = this.formBuilder.group({
 
    email: ['', [Validators.required ]],
 
    password: ['', [Validators.required]],
 
 
  });


  submit() {
    const userLogin: User = this.loginForm.value;
      this.userService.loginUser(userLogin).subscribe(() => {
        console.log("connection réussi");
        
      })
    
  }

}
