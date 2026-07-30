import { Component, OnInit } from '@angular/core';
import { TutoringRequestService } from '../../services/tutoring-request.service';

@Component({
  selector: 'app-tutoring-request',
  templateUrl: './tutoring-request.component.html',
  styleUrls: ['./tutoring-request.component.css']
})
export class TutoringRequestComponent implements OnInit {

  topic: string = '';
  requests: any[] = [];
  loading: boolean = false;

  constructor(private tutoringService: TutoringRequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  createRequest(): void {

    if (!this.topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    this.loading = true;

    this.tutoringService.createRequest(this.topic).subscribe({
      next: () => {
        this.loading = false;
        alert('Request created successfully');
        this.topic = '';
        this.loadRequests();
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Error creating request');
      }
    });
  }

  loadRequests(): void {
    this.tutoringService.getRequests().subscribe({
      next: (data: any) => {
        this.requests = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
