import { Component, OnInit } from '@angular/core';
import { TutoringService } from 'src/app/services/tutoring.service';
import { ToastService } from 'src/app/services/toast.service';
import { TutoringRequest, TutoringRequestStatus } from 'src/app/models/tutoring-request.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  standalone: false,
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  requests: TutoringRequest[] = [];
  loading = true;

  constructor(
    private tutoringService: TutoringService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.loading = true;
    this.tutoringService.listMine().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.toastService.error('Could not load your requests.');
      }
    });
  }

  statusLabel(status: TutoringRequestStatus): string {
    const labels: Record<TutoringRequestStatus, string> = {
      open: 'Waiting for a tutor',
      accepted: 'Scheduled',
      confirmed: 'Completed',
      expired: 'Expired',
      failed_transfer: 'Completed (credit transfer failed)'
    };
    return labels[status];
  }
}
