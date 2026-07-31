import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [LoadingSpinnerComponent, EmptyStateComponent, ToastComponent],
  imports: [CommonModule],
  exports: [LoadingSpinnerComponent, EmptyStateComponent, ToastComponent]
})
export class SharedModule {}
