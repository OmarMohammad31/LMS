import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-credit-balance',
  templateUrl: './credit-balance.component.html',
  standalone: false,
  styleUrls: ['./credit-balance.component.css']
})
export class CreditBalanceComponent implements OnInit {
  balance: number | null = null;
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getMe().subscribe({
      next: (user) => {
        this.balance = user.creditBalance;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
