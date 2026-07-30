import { Component } from '@angular/core';
import { TutoringService } from '../../services/tutoring.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent {
  topic = '';
  message = '';

  constructor(private tutoringService: TutoringService) { }

  onSubmit() {
    if (!this.topic) {
      this.message = 'please enter a topic';
      return;
    }
    this.tutoringService.createRequest(this.topic).subscribe({
      next: () => {
        this.message = 'request created successfully';
        this.topic = '';
      },
      error: (err: any) => {
        this.message = err.error?.error || 'error creating request';
      }
    });
  }
}