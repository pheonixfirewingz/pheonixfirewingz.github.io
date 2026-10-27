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
          {{ copyright }}
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--mat-sys-surface, #121212);
      color: var(--mat-sys-on-surface, #e0e0e0);
    }
    .app-header {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: var(--mat-sys-surface-container-lowest, #0f0f0f);
      border-bottom: 1px solid var(--mat-sys-outline-variant, #2a2a2a);
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
      color: var(--mat-sys-on-surface, #ffffff);
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
      color: var(--mat-sys-on-surface-variant, #b0b0b0);
    }
    .nav-links a.active {
      color: var(--mat-sys-primary, #90caf9);
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
      background: rgba(255, 255, 255, 0.05);
      transition: background 0.2s, transform 0.2s;
    }
    .social-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      transform: translateY(-2px);
    }
    .social-img {
      width: 18px;
      height: 18px;
      display: block;
      filter: invert(1);
    }
    .main-content {
      flex: 1;
    }
    .app-footer {
      border-top: 1px solid var(--mat-sys-outline-variant, #2a2a2a);
      background: var(--mat-sys-surface-container-lowest, #0a0a0a);
      padding: 24px 16px;
    }
    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .footer-copy {
      font-size: 0.875rem;
      color: var(--mat-sys-on-surface-variant, #888888);
    }
    @media (max-width: 680px) {
      .main-toolbar {
        padding: 0 8px;
      }
      .brand-name {
        font-size: 1.15rem;
      }
      .nav-links {
        margin-right: 8px;
        gap: 0;
      }
      .nav-links a {
        padding: 0 8px;
        font-size: 0.85rem;
      }
      .social-bar {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly copyright = SITE_DATA.copyright;
  protected readonly socialLinks = SITE_DATA.socialLinks;
}
