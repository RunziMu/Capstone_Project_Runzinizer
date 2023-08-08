import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    let formData = this.loginForm.value;

    this.userService.loginUser(formData).subscribe({
      next: (result) => {
        localStorage.setItem("currentUser", JSON.stringify(result)); //Store the user data on our browser
        alert('Welcome Back!');
        window.location.reload();
      },
      error: (err) => {
        alert(err.error);
        console.log(err);
      }
    })
  }
}
