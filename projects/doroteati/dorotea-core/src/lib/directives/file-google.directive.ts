import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  inject,
} from '@angular/core';
import { DoroteaFile } from '../entities/dorotea-file';
import { DoroteaGoogleStorageService } from '../services/dorotea-google-storage.service';

@Directive({
  selector: '[doroteaFileGoogle]',
  exportAs: 'doroteaFileGoogleDir',
  standalone: true,
})
export class DoroteaFileGoogleDirective {
  @Output() fileUploaded = new EventEmitter<DoroteaFile>();
  @Output() startUpload = new EventEmitter<void>();
  @Output() endUpload = new EventEmitter<void>();

  numFilesUpload = 0;
  numFilesUploading = 0;

  private googleStorage = inject(DoroteaGoogleStorageService);

  @HostListener('change', ['$event.target'])
  onChange(target: HTMLInputElement): void {
    // Verificar si se seleccionó al menos un archivo
    this.numFilesUpload = target.files?.length || 0;
    this.numFilesUploading = 0;

    if (this.numFilesUpload === 0) {
      return;
    }

    // Emitir evento de inicio
    this.startUpload.emit();

    // Subir cada archivo seleccionado
    for (let i = 0; i < this.numFilesUpload; i++) {
      if (target.files) {
        this.uploadFile(target.files[i]);
      }
    }
  }

  uploadFile(file: File): void {
    this.googleStorage.uploadDirect(file).subscribe({
      next: (result) => {
        if (!result.success || !result.response) {
          return;
        }

        this.fileUploaded.emit(result.response);
        this.numFilesUploading++;
        this.verifyIfEnd();
      },
      error: (error) => {
        console.error('Error uploading file:', error);
        this.numFilesUploading++;
        this.verifyIfEnd();
      },
    });
  }

  private verifyIfEnd(): void {
    if (this.numFilesUpload === this.numFilesUploading) {
      this.endUpload.emit();
    }
  }
}
