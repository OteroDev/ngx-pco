import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();

    const app = document.querySelector('ngx-app');
    const body = document.querySelector('body');
    const loader = document.querySelector('.loader-container');

    // Listen for the Angular Router's NavigationEnd event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Add the 'loaded' class to ngx-app and body
        if (app && body) {
          app.classList.add('loaded');
          body.classList.add('loaded');
        }
        // Remove the loader
        if (loader) {
          loader.remove();
        }
      }
    });
  }
}