import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  file = null;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.validatePassword]],
    });
  }

  validatePassword(control: any) {
    const password = control.value;
    const specialCharacterPattern = /[!@#$%^&*?]+/;

    if (password.length < 8) {
      return { 'passwordLength': true };
    }

    if (!specialCharacterPattern.test(password)) {
      return { 'passwordSpecialCharacter': true };
    }

    return null;
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  register() {
    let formData = new FormData();

    for (let key in this.registerForm.value) {
      formData.append(key, this.registerForm.value[key]);
    }

    if (this.file !== null) {
      formData.append('image', this.file);
    }

    this.userService.registerUser(formData).subscribe({
      next: (result) => {
        console.log(result);
        alert('User was created successfully');
        this.router.navigate(['/login']);
        // window.location.reload();
      },
      error: (err) => {
        console.log(err);
        alert(err);
      }
    });
  }
}
