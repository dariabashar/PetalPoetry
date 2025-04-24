import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match', 'Error');
      return;
    }

    const userData = {
      username: this.username,
      password: this.password,
      email: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.toastr.success('Registration successful!', 'Welcome');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error('Registration failed', 'Error');
      }
    });
  }
}
