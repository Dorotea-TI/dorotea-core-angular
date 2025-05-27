import { Component, inject, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { DoroteaConfirmModalConfig } from '../../entities/dorotea-confirm-modal-config';

@Component({
  selector: 'dorotea-confirm-modal',
  template: `
    <div class="confirmation-modal">
      <h3>{{ config().title }}</h3>
      <p [innerHTML]="config().caption"></p>
      <br />

      <div class="buttons">
        @for (button of config().buttons; track button.value) {
        <button mat-button (click)="onClick(button.value)">
          {{ button.title }}
        </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .confirmation-modal {
        text-align: center;

        .buttons {
          display: flex;
          align-items: center;

          button {
            width: 50%;
            margin: 0 8px;

            &:first-of-type {
              color: rgba(34, 34, 34, 0.6);
            }

            &:last-of-type {
              color: #ff0c3e !important;
            }
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [MatButton],
})
export class DoroteaConfirmModalComponent {
  private dialogRef = inject(MatDialogRef<DoroteaConfirmModalComponent>);

  // Using input() function for better type safety and modern Angular approach
  config = input.required<DoroteaConfirmModalConfig>();

  onClick(value: any): void {
    this.dialogRef.close(value);
  }
}
