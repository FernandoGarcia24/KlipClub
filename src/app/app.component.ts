import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CarouselComponent } from './domains/components/carousel/carousel.component'
import { PostFormComponent } from './domains/components/post-form/post-form.component'
import { ModalComponent } from './domains/components/modal/modal.component'

import { PostFeedComponent } from './domains/components/post-feed/post-feed.component'
import { EditImageModalComponent } from './domains/components/edit-image-modal/edit-image-modal.component'


import Cropper from 'cropperjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, CarouselComponent, PostFormComponent, ModalComponent, PostFeedComponent, EditImageModalComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'klipClub';

  publicacion: string = '';
  publicaciones: any[] = [];
  intervalo: any;
  public visibilidad: string = 'Público';
  public selectedImageUrl: string[] = [];
  public showPreview: boolean = false;

  agregarPublicacion() {
    if (this.publicacion.trim()) {
      this.publicaciones.unshift({
        usuario: 'Canserbero',
        tiempo: new Date(),
        contenido: this.publicacion,
        imagenUrl: this.selectedImageUrl,
        likes: 0,
        comentarios: 0,
        compartidos: 0,
        visibilidad: this.visibilidad,
        showMore: false
      });
      this.publicacion = '';
      this.selectedImageUrl = [];
      this.visibilidad = 'Público';

      this.showPreview = false;
    }
  }

  // Función para abrir el selector de archivos
  public openFileSelector() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    } else {
      console.error('No se encontró el campo de entrada de archivos.');
    }
  }

  // Función para manejar los archivos seleccionados
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

  // Función para cerrar el modal de vista previa
  public closePreview() {
    this.showPreview = false;
    this.selectedImageUrl = [];
    this.showEditModal = false;
    this.currentImage = null;
    if (this.cropper) {
      this.cropper.destroy();
    }

  }


  // Función para confirmar el post
  public confirmPost() {
    if (!this.publicacion.trim() && !this.selectedImageUrl) {
      alert('Por favor escribe algo o selecciona una imagen.');
      return;
    }

    const newPost = {
      usuario: 'Canserbero',
      tiempo: new Date(),
      contenido: this.publicacion,
      imagenUrl: this.selectedImageUrl.length > 0 ? this.selectedImageUrl : '',
      likes: 0,
      comentarios: 0,
      compartidos: 0,
      visibilidad: this.visibilidad
    };

    this.publicaciones.unshift(newPost);

    this.publicacion = '';
    this.selectedImageUrl = [];
    this.visibilidad = 'Público';

    this.showPreview = false;
  }


  public agregarPublicacionModal() {
    console.log('Contenido del post:', this.publicacion);
    this.publicacion = '';
    this.selectedImageUrl = [];
    this.showPreview = false;
  }

  get validImageUrls(): string[] {
    return this.selectedImageUrl.filter(url => typeof url === 'string') as string[];
  }



  // Edit mostrar imgagenes
  public isEditing: boolean = false;
  showEditModal: boolean = false;
  currentImage: string | null = null;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  @ViewChild('imageToCrop') imageElement!: ElementRef<HTMLImageElement>;
  cropper!: Cropper;


  public toggleEditMode() {
    this.isEditing = !this.isEditing;
  }


  public openEditModal() {
    this.showEditModal = true;
  }

  editImage(imageUrl: string) {
    this.currentImage = imageUrl;
    this.isEditing = true;
    this.showEditModal = true;

    setTimeout(() => {
      if (this.imageElement && this.imageElement.nativeElement) {
        this.initializeCropper();
      }
    }, 0);
  }

   // Método para cerrar el modal y eliminar la imagen
  closeEditImage(imageUrl: string): void {
    this.selectedImageUrl = this.selectedImageUrl.filter(url => url !== imageUrl);
    this.currentImage = null;
  }

  closeEditImagePage() {
    this.showEditModal = false;
    this.currentImage = null;
  }


  // Recortar Imagen
  initializeCropper() {
    this.cropper = new Cropper(this.imageElement.nativeElement, {
      aspectRatio: 1, // Ajusta según sea necesario
      viewMode: 1,
      autoCropArea: 1,
      responsive: true,
    });
  }


  //  Caroucel
  @ViewChild('content', { static: true }) content!: ElementRef;

  posts = [
    { contenido: 'Este es el contenido del post...', showMore: false, isTruncated: false },
  ];


  checkTruncation() {
    const contentElement = this.content.nativeElement;
    const lineHeight = parseFloat(getComputedStyle(contentElement).lineHeight);
    const maxHeight = 2 * lineHeight;

    for (let post of this.posts) {
      contentElement.innerText = post.contenido;
      post.isTruncated = contentElement.scrollHeight > maxHeight;
    }
  }

  openCreatePostModal() {
    this.showEditModal = false;
  }

  closeEditModal() {
    this.isEditing = false;
    this.currentImage = null;
  }
}
