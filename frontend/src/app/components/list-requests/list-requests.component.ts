import { Component, OnInit } from '@angular/core';
import { TutoringService } from '../../services/tutoring.service';

@Component({
  selector: 'app-list-requests',
  templateUrl: './list-requests.component.html',
  styleUrls: ['./list-requests.component.css']
})
export class ListRequestsComponent implements OnInit {
  requests: any[] = [];
  message = '';

  constructor(private tutoringService: TutoringService) { }

  ngOnInit() {
   this.tutoringService.listAllRequests().subscribe({
       next: (res: any) => {
        this.requests = res;
      },
      error: (err: any) => {
        this.message = err.error?.error || 'error loading requests';
      }
    });
  }
}