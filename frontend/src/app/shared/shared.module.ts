import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { CreditBalanceComponent } from './components/credit-balance/credit-balance.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ToastComponent,
    ConfirmDialogComponent,
    CreditBalanceComponent
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ToastComponent,
    ConfirmDialogComponent,
    CreditBalanceComponent
  ]
})
export class SharedModule {}
