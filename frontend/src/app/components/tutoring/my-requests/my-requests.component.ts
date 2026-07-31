import { Component, OnInit } from '@angular/core';
import { TutoringService } from 'src/app/services/tutoring.service';
import { ToastService } from 'src/app/services/toast.service';
import { TutoringRequest, TutoringRequestStatus } from 'src/app/models/tutoring-request.model';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  requests: TutoringRequest[] = [];
  loading = true;
  confirmingId: string | null = null;

  dialogOpen = false;
  pendingRequestId: string | null = null;

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

  canConfirm(request: TutoringRequest): boolean {
    return request.status === 'accepted' && !!request.confirmationDeadline;
  }

  openConfirmDialog(request: TutoringRequest): void {
    this.pendingRequestId = request._id;
    this.dialogOpen = true;
  }

  cancelConfirm(): void {
    this.dialogOpen = false;
    this.pendingRequestId = null;
  }

  proceedConfirm(): void {
    if (!this.pendingRequestId) return;
    const requestId = this.pendingRequestId;
    this.dialogOpen = false;
    this.pendingRequestId = null;
    this.confirmingId = requestId;

    this.tutoringService.confirmRequest(requestId).subscribe({
      next: (result) => this.handleConfirmResult(result),
      error: () => {
        this.confirmingId = null;
        this.toastService.error('Could not confirm session, please try again.');
      }
    });
  }

  private handleConfirmResult(result: TutoringRequest | null): void {
    this.confirmingId = null;

    if (result === null) {
      this.toastService.info('Confirmation recorded, waiting on the other party.');
      this.loadRequests();
      return;
    }

    if (result.status === 'failed_transfer') {
      this.toastService.error('Session confirmed, but the credit transfer failed (insufficient balance).');
    } else if (result.status === 'confirmed') {
      this.toastService.success('Session confirmed, credit transferred.');
    }

    this.loadRequests();
  }
}
