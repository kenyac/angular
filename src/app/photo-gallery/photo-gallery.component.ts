import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
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
        let projection: d3.GeoProjection = d3.geoMercator().fitWidth(this.scrWidth - 250, this.countries);

        let svg = d3.select<SVGSVGElement, unknown>('.map-container').append('svg')
          .attr('width', this.scrWidth - 250)
          .attr('height', this.scrHeight);

        const path = d3.geoPath().projection(projection);

        console.log();

        svg.append("g")
            .selectAll("path")
            .data(this.countries.features)
            .enter().append("path")
                .attr("fill", "#69b3a2")
                .attr("d", <d3.GeoPath<any,any>>path)
                .style("stroke", "#fff")
                
        const zoom = d3.zoom<SVGSVGElement, unknown>()
              .scaleExtent([1, 8])
              .translateExtent([[0,0],[this.scrWidth -250, path.bounds(data)[1][1]]])
              .on('zoom', function() {
                  svg.selectAll('path')
                  .attr('transform', d3.event.transform);
        });

        svg.call(zoom);
                        
      }

        
    });

    
  }
}
