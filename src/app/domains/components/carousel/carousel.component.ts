import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {

  // ---------- Caroucel -----------

  images = [
    { id: 1, src: 'karolg.jpg', name: 'Karol G', stars: '⭐ 20k' },
    { id: 2, src: 'Ariana Grande.webp', name: 'Ariana Grande', stars: '⭐ 200' },
    { id: 3, src: 'avicii.jpg', name: 'AVICII', stars: '⭐ 200' },
    { id: 4, src: 'shakira.jpg', name: 'Shakira', stars: '⭐ 200' },
    { id: 5, src: 'camilo.webp', name: 'Camilo', stars: '⭐ 200' },
    { id: 6, src: 'daddy.webp', name: 'daddy yankee', stars: '⭐ 180' },
    { id: 7, src: 'badBunny.jpeg', name: 'Bad Bunny', stars: '⭐ 150' },
    { id: 8, src: 'jbalvin.jpg', name: 'J Balvin', stars: '⭐ 170' },
    { id: 9, src: 'maluma.webp', name: 'Maluma', stars: '⭐ 190' },
    { id: 10, src: 'rosalia.webp', name: 'Rosalía', stars: '⭐ 160' },
    { id: 11, src: 'duaLipa.jpg', name: 'Dua Lipa', stars: '⭐ 180' },
    { id: 12, src: 'martinGarrix', name: 'Martin Garrix', stars: '⭐ 150' },
    { id: 13, src: 'Tiësto.jpg', name: 'Tiësto', stars: '⭐ 170' },
    { id: 14, src: 'donOmar.webp', name: 'Don Omar', stars: '⭐ 190' },
    { id: 15, src: 'tegoCalderon.webp', name: 'Tego Calderón', stars: '⭐ 160' }
  ];

  currentIndex = 0;
  itemsPerSlide = 5;

  constructor() {}


  autoSlide(): void {
    setInterval(() => {
      this.next();
    }, 3000); // Cambia de slide cada 3 segundos
  }

  next(): void {
    const totalSlides = Math.ceil(this.images.length / this.itemsPerSlide);
    this.currentIndex = (this.currentIndex + 1) % totalSlides;
  }

  prev(): void {
    const totalSlides = Math.ceil(this.images.length / this.itemsPerSlide);
    this.currentIndex = (this.currentIndex - 1 + totalSlides) % totalSlides;
  }

  get visibleImages() {
    const startIndex = this.currentIndex * this.itemsPerSlide;
    const endIndex = Math.min(startIndex + this.itemsPerSlide, this.images.length);
    return this.images.slice(startIndex, endIndex);
  }

  get carouselTitle(): string {
    if (this.currentIndex === 0) {
      return 'Trending';
    } else if (this.currentIndex === 1) {
      return 'Competitors';
    } else if (this.currentIndex === 2) {
      return 'Private Channels';
    } else {
      return '';
    }
  }

}
