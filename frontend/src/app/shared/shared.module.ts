import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, LoadingSpinnerComponent, EmptyStateComponent, ToastComponent],
  exports: [LoadingSpinnerComponent, EmptyStateComponent, ToastComponent]
})
export class SharedModule {}
