import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-debug',
  templateUrl: './users-debug.component.html',
  styleUrls: ['./users-debug.component.css']
})
export class UsersDebugComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Could not load users.');
      }
    });
  }
}
