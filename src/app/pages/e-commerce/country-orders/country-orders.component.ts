import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpoint, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { GeoHierarchicalData } from '../../../@core/data/geo-hierarchical-data';

@Component({
  selector: 'app-geo-hierarchical',
  styleUrls: ['./country-orders/map/geo-hierarchical-map.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.md ? 'medium' : 'giant'">
      <nb-card-header>Hierarchical Map Statistics</nb-card-header>
      <nb-card-body>
        <app-geo-hierarchical-map 
          (selectEvent)="selectFeature($event)"
          [currentLevel]="currentLevel">
        </app-geo-hierarchical-map>
        <app-geo-hierarchical-chart 
          [featureName]="selectedFeatureName"
          [data]="featureData"
          [labels]="categories"
          maxValue="20">
        </app-geo-hierarchical-chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class GeoHierarchicalComponent implements OnInit, OnDestroy {
  private alive = true;

  currentLevel = 'Superintendência'; // Nível hierárquico atual
  selectedFeatureName = '';
  featureData: number[] = [];
  categories: string[] = [];
  breakpoint: NbMediaBreakpoint = { name: '', width: 0 };
  breakpoints: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private geoHierarchicalService: GeoHierarchicalData
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
  }

  ngOnInit() {
    this.themeService.onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });

    this.geoHierarchicalService.getHierarchyCategories(this.currentLevel)
      .pipe(takeWhile(() => this.alive))
      .subscribe((categories) => {
        this.categories = categories;
      });
  }

  selectFeature(featureName: string) {
    this.selectedFeatureName = featureName;

    this.geoHierarchicalService.getHierarchyData(this.currentLevel, featureName)
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.featureData = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}