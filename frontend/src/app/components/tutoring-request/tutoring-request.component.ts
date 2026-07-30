
import { Component } from '@angular/core';
import { TutoringRequestService } from '../../services/tutoring-request.service';

@Component({
  selector: 'app-tutoring-request',
  templateUrl: './tutoring-request.component.html',
  styleUrls: ['./tutoring-request.component.css']
})
export class TutoringRequestComponent {

  topic: string = '';
  requests: any[] = [];

  constructor(private tutoringService: TutoringRequestService) {}

  createRequest() {
    this.tutoringService.createRequest(this.topic).subscribe({
      next: (res) => {
        alert('Request created successfully');
        this.topic = '';
        this.loadRequests();
      },
      error: (err) => {
        alert(err.error?.message || 'Error creating request');
      }
    });
  }

  loadRequests() {
    this.tutoringService.getRequests().subscribe({
      next: (data: any) => {
        this.requests = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.loadRequests();
  }
}
