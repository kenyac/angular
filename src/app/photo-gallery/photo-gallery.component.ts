import { Component, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { MapService } from './photo-map.service';
import * as topojson from "topojson-client";
import { ViewEncapsulation } from '@angular/core';
import { FeatureCollection, GeoJsonProperties, GeometryCollection } from 'geojson';

@Component({
  selector: 'pg-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.sass'],
  providers: [MapService],
  encapsulation: ViewEncapsulation.None
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
        let active = d3.select(null);
        this.countries = data;
        let projection: d3.GeoProjection = d3.geoMercator();

        let svg = d3.select<SVGSVGElement, unknown>('.map-container').append('svg')
          .attr('width', this.scrWidth - 250)
          .attr('height', this.scrHeight);
        
        const reset = () => {
            console.log("reset")
        }

        svg.append("rect")
          .attr("class", "background")
          .attr("width", this.scrWidth)
          .attr("height", this.scrHeight)
          .on("click", reset);

        const path = d3.geoPath().projection(projection);

        let mapFeatures : any = topojson.feature(this.countries, this.countries.objects.countries);

        function clicked(this: any, d: any){
          console.log("click");
          console.log(this);
          if (active.node() === this) return reset();
          active.classed("active", false);
          active = d3.select(this).classed("active", true);
         topojson.mesh;
        }
         
        let g = svg.append("g");

        g.selectAll("path")
            .data(mapFeatures.features)
            .enter().append("path")
            .attr("d", <d3.GeoPath<any,any>>path)
            .attr("class", "feature")
            .on("click", clicked);

        g.append("path")
            .datum(topojson.mesh(this.countries, this.countries.objects.countries, function(a, b) { return a !== b; }))
            .attr("class", "mesh")
            .attr("d", <d3.GeoPath<any,any>>path);
                
        const zoom = d3.zoom<SVGSVGElement, unknown>()
              .scaleExtent([1, 8])
              .on('zoom', function() {
                  svg.selectAll('path')
                  .attr('transform', d3.event.transform);
        });

        

        svg.call(zoom);
                        
      }

        
    });

    
  }
}
