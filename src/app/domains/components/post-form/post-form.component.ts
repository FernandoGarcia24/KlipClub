import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {

  title = 'klipClub';


  publicacion: string = '';
  publicaciones: any[] = [];
  intervalo: any;
  public visibilidad: string = 'Público';
  public selectedImageUrl: string | ArrayBuffer | null = null;
  public showPreview: boolean = false;

  private publicacionesSubject = new BehaviorSubject<any[]>([]);
  publicaciones$ = this.publicacionesSubject.asObservable();

  agregarPublicacion(publicacion: any) {
    const publicaciones = this.publicacionesSubject.value;
    publicaciones.unshift(publicacion);
    this.publicacionesSubject.next(publicaciones);
  }

  public likePublicacion(publicacion: any) {
    publicacion.likes += 1; // Incrementa el número de likes
  }

  calcularTiempoTranscurrido(fechaPublicacion: Date): string {
    const ahora = new Date();
    const diferenciaMilisegundos = ahora.getTime() - new Date(fechaPublicacion).getTime();

    const segundos = Math.floor(diferenciaMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    console.log(fechaPublicacion);
    console.log("Segundos:", segundos);
    console.log("Minutos: ", minutos);

    if (segundos < 60) {
      return 'Hace unos segundos';
    } else if (minutos < 60) {
      return `Hace ${minutos} min`;
    } else if (horas < 24) {
      return `Hace ${horas} horas`;
    } else {
      return `Hace ${dias} días`;
    }
  }

  // Función para abrir el selector de archivos
  public openFileSelector() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.click(); // Simula el clic en el input de archivos
    } else {
      console.error('No se encontró el campo de entrada de archivos.');
    }
  }

   // Función para manejar el archivo seleccionado
  public handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result; // Guarda la URL de la imagen
        this.showPreview = true; // Muestra el modal
      };
      reader.readAsDataURL(file); // Lee el archivo como URL de datos
    } else {
      console.error('No se seleccionó ningún archivo.');
    }
  }

   // Función para cerrar el modal de vista previa
  public closePreview() {
    this.showPreview = false;
    this.selectedImageUrl = null; // Opcional: Limpiar la URL de la imagen
  }

   // Función para confirmar el post
   public confirmPost() {
    if (!this.publicacion.trim() && !this.selectedImageUrl) {
      alert('Please write something or select an image.');
      return;
    }

    const newPost = {
      usuario: 'Usuario Actual',  // Aquí podrías poner el nombre del usuario logueado
      tiempo: new Date(),
      contenido: this.publicacion,
      imagenUrl: this.selectedImageUrl,
      likes: 0,
      comentarios: 0,
      compartidos: 0,
      visibilidad: this.visibilidad
    };

    this.publicaciones.unshift(newPost); // Agrega la nueva publicación al principio del array

    // Limpiar el formulario
    this.publicacion = '';
    this.selectedImageUrl = null;
    this.visibilidad = 'Público';

    this.showPreview = false; // Cierra el modal
  }



  // Función para agregar una publicación (incluye la lógica para manejar publicaciones)
  public agregarPublicacionModal() {
    // Aquí puedes añadir la lógica para publicar el contenido y la imagen
    console.log('Contenido del post:', this.publicacion);
    // Limpiar el contenido y la imagen
    this.publicacion = '';
    this.selectedImageUrl = null;
    this.showPreview = false;
  }

}
