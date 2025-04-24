import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.toastr.error('Please fill in all fields', 'Error');
      return;
    }

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.access);
        this.toastr.success('Successfully logged in!', 'Welcome');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.toastr.error('Invalid credentials', 'Login Failed');
      }
    });
  }
}
