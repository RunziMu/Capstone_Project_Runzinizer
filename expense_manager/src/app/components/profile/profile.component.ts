import { FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { Iuser } from 'src/app/interfaces/iuser';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile_data!: Iuser;

  constructor(private userService: UserService) {
    this.profile_data = this.userService.getUserData();
  }

  logout() {
    localStorage.removeItem("currentUser");
    alert('You have successfully logged out!');
    window.location.reload();
  }
}
