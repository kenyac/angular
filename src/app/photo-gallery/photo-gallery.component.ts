import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { geoMercator, GeoPath } from 'd3-geo';
import { geoPath } from 'd3-geo';
import { MapService } from './photo-map.service';

@Component({
  selector: 'pg-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.sass'],
  providers: [MapService]
})
export class PhotoGalleryComponent implements OnInit {
  
  constructor(private mapService: MapService) {
    this.getScreenSize();
  }
  scrHeight:any;
  scrWidth:any;
  countries: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: undefined) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        console.log(this.scrHeight, this.scrWidth);
  }

  ngOnInit(): void {
    this.mapService.getMap().subscribe({
      next: data => {

        this.countries = data;
        let projection: d3.GeoProjection = geoMercator().fitWidth(this.scrWidth, this.countries);
        let svg = d3.select('.map-container').append('svg')
          .attr('width', this.scrWidth - 250)
          .attr('height', this.scrHeight);

        const path = d3.geoPath().projection(projection);

        svg.append("g")
            .selectAll("path")
            .data(this.countries.features)
            .enter().append("path")
                .attr("fill", "#69b3a2")
                .attr("d", <GeoPath<any,any>>path)
                .style("stroke", "#fff")
      }
    });

    
  }
}
