import { Component, OnInit } from '@angular/core';
import { GeoHierarchicalMapService } from './geo-hierarchical-map.service';
import * as L from 'leaflet';
import * as turf from '@turf/turf';

@Component({
  selector: 'app-geo-hierarchical-map',
  templateUrl: './geo-hierarchical-map.component.html',
  styleUrls: ['./geo-hierarchical-map.component.scss']
})
export class GeoHierarchicalMapComponent implements OnInit {
  geoJsonData: any;
  selectedFeature: any;
  currentLevel: 'Superintendência' | 'Gerência' | 'Polo' = 'Superintendência';
  map: L.Map; // Referência ao mapa Leaflet

  constructor(private mapService: GeoHierarchicalMapService) {}

  ngOnInit(): void {
    this.mapService.loadGeoJson().subscribe((data) => {
      this.geoJsonData = data;
      this.initializeMap();
      this.updateMapLayers(); // Exibir Superintendências inicialmente
    });
  }

  initializeMap(): void {
    this.map = L.map('map', {
      center: [-19.9, -43.9], // Coordenadas iniciais para Minas Gerais
      zoom: 7,
    });
  }

  updateMapLayers(): void {
    // Limpar camadas existentes
    this.map.eachLayer((layer) => {
      if ((layer as any).feature) {
        this.map.removeLayer(layer);
      }
    });

    // Filtrar GeoJSON com base no nível atual
    const filteredData = this.filterGeoJsonByLevel(this.geoJsonData);

    // Adicionar camadas ao mapa
    L.geoJSON(filteredData, {
      style: (feature) => ({
        color: this.getColorByLevel(),
        weight: 2,
      }),
      onEachFeature: (feature, layer) => {
        layer.on({
          click: () => this.onFeatureClick(feature),
        });
      },
    }).addTo(this.map);
  }

  filterGeoJsonByLevel(data: any): any {
    // Filtrar as features com base no nível atual
    return {
      ...data,
      features: data.features.filter((feature) => {
        if (this.currentLevel === 'Superintendência') {
          return feature.properties['Superintendência'];
        } else if (this.currentLevel === 'Gerência') {
          return feature.properties['Gerência'];
        } else if (this.currentLevel === 'Polo') {
          return feature.properties['Polo'];
        }
        return false;
      }),
    };
  }

  getColorByLevel(): string {
    // Retornar cores diferentes com base no nível
    if (this.currentLevel === 'Superintendência') {
      return '#3388ff';
    } else if (this.currentLevel === 'Gerência') {
      return '#33ff88';
    } else if (this.currentLevel === 'Polo') {
      return '#ff8833';
    }
    return '#3388ff';
  }

  onFeatureClick(feature: any): void {
    this.selectedFeature = feature.properties;
    console.log('Selecionado:', feature.properties);

    // Atualizar nível e camadas
    if (this.currentLevel === 'Superintendência') {
      this.currentLevel = 'Gerência';
    } else if (this.currentLevel === 'Gerência') {
      this.currentLevel = 'Polo';
    }
    this.updateMapLayers();
  }

  goBack(): void {
    // Voltar para o nível anterior
    if (this.currentLevel === 'Polo') {
      this.currentLevel = 'Gerência';
    } else if (this.currentLevel === 'Gerência') {
      this.currentLevel = 'Superintendência';
    }
    this.updateMapLayers();
  }

  getTitle(): string {
    return `Nível Atual: ${this.currentLevel}`;
  }
}