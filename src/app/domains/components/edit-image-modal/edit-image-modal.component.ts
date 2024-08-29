import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

@Component({
  selector: 'app-edit-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-image-modal.component.html',
  styleUrl: './edit-image-modal.component.css'
})
export class EditImageModalComponent implements AfterViewInit {

  @Input() imageUrl: string | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() postConfirmed = new EventEmitter<any>();

  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;
  cropper!: Cropper;

  ngAfterViewInit() {
    if (this.imageElement && this.imageElement.nativeElement) {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        aspectRatio: 1,
        viewMode: 1,
        autoCropArea: 1,
        responsive: true,
        background: false,
      });
    }
  }

  closeModal() {
    this.close.emit();
  }

  cancel() {
    this.closeModal();
  }

  applyCrop() {
    const croppedCanvas = this.cropper.getCroppedCanvas();
    croppedCanvas.toBlob((blob) => {
      if (blob) {
        // Crear una URL de objeto para la imagen recortada
        const croppedImageUrl = URL.createObjectURL(blob);

        // Emitir la URL para que el componente principal pueda actualizar el estado
        this.postConfirmed.emit(croppedImageUrl);

        // Opcional: Limpiar recursos
        URL.revokeObjectURL(croppedImageUrl);

        this.closeModal();
      }
    }, 'image/jpeg');
  }


  confirmPost() {
    const postData = {
      imageUrl: this.imageUrl,
      // Puedes añadir otros datos aquí, como el contenido del post, etc.
    };
    this.postConfirmed.emit(postData); // Emitir el evento con la información del post
  }



}
