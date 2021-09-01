import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { geoMercator } from 'd3-geo';
import { geoPath } from 'd3-geo';
import { MapService } from './photo-map.service';

@Component({
  selector: 'pg-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.sass'],
  providers: [MapService]
})
export class PhotoGalleryComponent implements OnInit {

  constructor() {
    this.getScreenSize();
  }
  scrHeight:any;
  scrWidth:any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: undefined) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }

  ngOnInit(): void {
    let projection: d3.GeoProjection = geoMercator();
    let svg = d3.select('.map-container').append('svg')
      .attr('width', this.scrWidth - 250)
      .attr('height', this.scrHeight);

    const path = d3.geoPath().projection(projection);
    
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
    
    .then(data => {
      console.log(data.feature);
  })};

}
