import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery-menu.component.html',
  styleUrls: ['./photo-gallery-menu.component.sass']
})
export class PhotoGalleryMenuComponent implements OnInit {

  slideCount: number = 0;
  slideTimer: number = 0;

  constructor(private router:Router) { }

  projectTitle: string = "Photo Gallery";
  projectDescription: string = "This is my first Angular project I will me making. Please don't judge me.";

  ngOnInit(): void {
  }

  hover() {
    //an arrow function is necessary here to keep slidecount in scope
    this.slideTimer = window.setInterval(() => {
      var slides = document.getElementsByClassName("carousel-item");
      slides[this.slideCount].classList.remove("active");
      this.slideCount = this.slideCount + 1 >= slides.length? 0 : (this.slideCount + 1);
      slides[this.slideCount].classList.add("active");
    }, 700);
  }

  unhover() {
    clearInterval(this.slideTimer);
  }

  divClick() {
    clearInterval(this.slideTimer);
    this.router.navigateByUrl('/photo-gallery');
  }
}
