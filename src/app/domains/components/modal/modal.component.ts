import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {


  publicacion: string = '';
  public visibilidad: string = 'Público';

  @Input() selectedImageUrl: string[] = [];
  @Output() postConfirmed = new EventEmitter<void>();

  showEditModal: boolean = false;
  public showPreview: boolean = false;


  public closePreview() {
    this.showPreview = false;
    this.selectedImageUrl = [];
  }

  public openFileSelector() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('No se encontró el campo de entrada de archivos.');
    }
  }
  public openEditModal() {
    this.showEditModal = true;
  }


  confirmPost() {
    if (this.selectedImageUrl.length > 0) {
      this.postConfirmed.emit();
    } else {
      alert('Por favor, selecciona una imagen antes de confirmar.');
    }
  }

  public handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedImageUrl.push(e.target.result);
          this.showPreview = true;
        };
        reader.readAsDataURL(file);
      });
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }



}
