import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SITE_DATA } from '../site-data';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <section class="hero-container">
      <div class="hero-bg" [style.background-image]="'url(' + heroImage + ')'">
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1 class="hero-title">{{ heading }}</h1>
        <p class="hero-subtitle">{{ subheading }}</p>
        <div class="hero-actions">
          <a mat-flat-button routerLink="/portfolio">View Portfolio</a>
          <a mat-stroked-button routerLink="/about">About Me</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
      height: calc(100vh - 72px);
      min-height: 500px;
      position: relative;
    }
    .hero-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background-size: cover;
      background-position: center;
      z-index: 1;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
    }
    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: #ffffff;
      padding: 0 24px;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.02em;
      margin: 0 0 16px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    .hero-subtitle {
      font-size: clamp(1.2rem, 3vw, 1.8rem);
      font-weight: 300;
      line-height: 1.4;
      letter-spacing: 0.05em;
      margin: 0 0 32px;
      color: rgba(255, 255, 255, 0.9);
      text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    }
    .hero-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .hero-actions a {
      font-size: 1rem;
      padding: 0 24px;
      height: 44px;
      line-height: 44px;
      border-radius: 4px;
    }
    .hero-actions a[mat-stroked-button] {
      color: #fff;
      border-color: rgba(255, 255, 255, 0.7);
    }
    .hero-actions a[mat-stroked-button]:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly heading = SITE_DATA.pages.home.heading;
  protected readonly subheading = SITE_DATA.pages.home.subheading;
  protected readonly heroImage = SITE_DATA.pages.home.heroImage.localPath;
}
