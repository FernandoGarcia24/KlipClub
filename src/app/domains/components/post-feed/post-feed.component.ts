import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent {

  @Input() publicaciones: any[] = [];

  publicacion: string = '';
  intervalo: any;
  public visibilidad: string = 'Público';
  public selectedImageUrl: string[] = [];
  public showPreview: boolean = false;


  calcularTiempoTranscurrido(fechaPublicacion: Date): string {
    const ahora = new Date();
    const diferenciaMilisegundos = ahora.getTime() - new Date(fechaPublicacion).getTime();

    const segundos = Math.floor(diferenciaMilisegundos / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

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

  public likePublicacion(publicacion: any) {
    publicacion.likes += 1;
  }

  toggleContent(event: Event, post: any) {
    event.preventDefault();
    post.showMore = !post.showMore;
  }

  shouldShowSeeMore(content: string): boolean {
    return content.length > 100;
  }


  get validImageUrls(): string[] {
    return this.selectedImageUrl.filter(url => typeof url === 'string') as string[];
  }


}
