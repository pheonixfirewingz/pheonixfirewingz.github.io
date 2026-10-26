import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SITE_DATA } from './site-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <header class="app-header">
      <mat-toolbar class="main-toolbar">
        <a routerLink="/" class="brand-link">
          <span class="brand-name">Luke Shore</span>
        </a>

        <span class="toolbar-spacer"></span>

        <nav class="nav-links">
          <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a mat-button routerLink="/portfolio" routerLinkActive="active">Portfolio</a>
          <a mat-button routerLink="/about" routerLinkActive="active">About</a>
          <a mat-button routerLink="/blog" routerLinkActive="active">Blog</a>
        </nav>

        <div class="social-bar">
          @for (social of socialLinks; track social.platform) {
            <a [href]="social.url" target="_blank" rel="noopener noreferrer" [title]="social.platform" class="social-btn">
              <img [src]="social.iconLocalPath" [alt]="social.platform" class="social-img" />
            </a>
          }
        </div>
      </mat-toolbar>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <footer class="app-footer">
      <div class="footer-container">
        <div class="footer-copy">
          {{ copyright }} · Powered and secured by Angular &amp; Material
        </div>
        <div class="footer-social">
          @for (social of socialLinks; track social.platform) {
            <a [href]="social.url" target="_blank" rel="noopener noreferrer" class="social-btn" [title]="social.platform">
              <img [src]="social.iconLocalPath" [alt]="social.platform" class="social-img" />
            </a>
          }
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--mat-sys-surface, #ffffff);
      border-bottom: 1px solid var(--mat-sys-outline-variant, #e5e5e5);
    }
    .main-toolbar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
      height: 72px;
      background: transparent;
      display: flex;
      align-items: center;
    }
    .brand-link {
      text-decoration: none;
      color: var(--mat-sys-on-surface);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-name {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .toolbar-spacer {
      flex: 1;
    }
    .nav-links {
      display: flex;
      gap: 4px;
      margin-right: 16px;
    }
    .nav-links a {
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--mat-sys-on-surface-variant);
    }
    .nav-links a.active {
      color: var(--mat-sys-primary);
      font-weight: 600;
    }
    .social-bar {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      transition: background 0.2s, transform 0.2s;
    }
    .social-btn:hover {
      background: var(--mat-sys-surface-container, #f0f0f0);
      transform: scale(1.1);
    }
    .social-img {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    .main-content {
      flex: 1;
    }
    .app-footer {
      background: var(--mat-sys-surface-container-low, #f8f8f8);
      border-top: 1px solid var(--mat-sys-outline-variant, #e5e5e5);
      padding: 24px 16px;
      margin-top: auto;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .footer-copy {
      font-size: 0.85rem;
      color: var(--mat-sys-on-surface-variant, #666);
    }
    .footer-social {
      display: flex;
      gap: 12px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly socialLinks = SITE_DATA.socialLinks;
  protected readonly copyright = SITE_DATA.copyright;
}
