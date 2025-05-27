import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[DoroteaFileDragAndDrop]',
})
export class FileDragAndDropDirective {
  @Output() fileSelected = new EventEmitter<File>();
  @Output() dragFileOver = new EventEmitter<boolean>();
  @Output() dragFileLeave = new EventEmitter<boolean>();

  constructor() {}

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  activate(e: any) {
    e.preventDefault();
    this.dragFileOver.emit(true);
  }

  @HostListener('dragleave', ['$event'])
  deactivate(e: any) {
    e.preventDefault();
    this.dragFileLeave.emit(true);
  }

  @HostListener('drop', ['$event'])
  handleDrop(e: any) {
    this.deactivate(e);

    const fileList = e.dataTransfer.files;
    for (const file of fileList) {
      this.fileSelected.emit(file);
    }
  }
}
