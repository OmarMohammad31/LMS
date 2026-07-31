import { Component, OnInit } from '@angular/core';
import { TutoringService } from '../../services/tutoring.service';

@Component({
  selector: 'app-accept-requests',
  templateUrl: './accept-requests.component.html',
  standalone: false,
  styleUrls: ['./accept-requests.component.css']
})
export class AcceptRequestsComponent implements OnInit {
  requests: any[] = [];
  message = '';
  startTime: { [key: string]: string } = {};
  durationMinutes: { [key: string]: number } = {};

  constructor(private tutoringService: TutoringService) { }

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.tutoringService.listOpenRequests().subscribe({
      next: (res: any) => {
        this.requests = res;
      },
     error: (err: any) => {
  this.message = err.error?.error || 'error loading requests';
}
    });
  }

  accept(requestId: string) {
    const data = {
      startTime: this.startTime[requestId],
      durationMinutes: Number(this.durationMinutes[requestId])
    };
    if (!data.startTime || !data.durationMinutes) {
      this.message = 'please pick a time and duration first';
      return;
    }
    this.tutoringService.acceptRequest(requestId, data).subscribe({
      next: () => {
        this.message = 'request accepted successfully';
        this.loadRequests();
      },
    error: (err: any) => {
  this.message = err.error?.error || 'error accepting request';
}
    });
  }
}
