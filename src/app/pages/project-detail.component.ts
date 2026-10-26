import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { SITE_DATA } from '../site-data';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    @if (project(); as proj) {
      <div class="project-detail-page">
        <div class="container">
          <nav class="breadcrumb">
            <a mat-button routerLink="/portfolio">
              <mat-icon>arrow_back</mat-icon>
              Back to Portfolio
            </a>
          </nav>

          <header class="project-header">
            <h1 class="project-title">{{ proj.title }}</h1>
            <div class="details-chips">
              @for (detail of proj.details; track detail.label) {
                <div class="detail-badge">
                  <span class="detail-label">{{ detail.label }}:</span>
                  @if (detail.url) {
                    <a [href]="detail.url" target="_blank" rel="noopener noreferrer" class="detail-link">
                      {{ detail.text }}
                      <mat-icon class="inline-icon">open_in_new</mat-icon>
                    </a>
                  } @else {
                    <span class="detail-value">{{ detail.text }}</span>
                  }
                </div>
              }
            </div>
          </header>

          <div class="project-body">
            <div class="description-section">
              <h2 class="section-title">Overview</h2>
              <p class="description-text">{{ proj.description }}</p>
            </div>

            <div class="gallery-section">
              <h2 class="section-title">Project Gallery</h2>
              <div class="gallery-grid">
                @for (img of proj.images; track img.localPath) {
                  <mat-card class="gallery-card" appearance="outlined">
                    <img [src]="img.localPath" [alt]="img.title || proj.title" class="gallery-img" />
                    @if (img.title || img.description) {
                      <mat-card-content class="gallery-caption">
                        @if (img.title) {
                          <div class="img-title">{{ img.title }}</div>
                        }
                        @if (img.description) {
                          <div class="img-desc">{{ img.description }}</div>
                        }
                      </mat-card-content>
                    }
                  </mat-card>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    } @else {
      <div class="not-found-page">
        <h2>Project Not Found</h2>
        <a mat-flat-button routerLink="/portfolio">Back to Portfolio</a>
      </div>
    }
  `,
  styles: [`
    .project-detail-page {
      padding: 32px 24px 64px;
      min-height: calc(100vh - 72px);
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
    }
    .breadcrumb {
      margin-bottom: 24px;
    }
    .project-header {
      margin-bottom: 36px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #2a2a2a);
      padding-bottom: 24px;
    }
    .project-title {
      font-size: 2.4rem;
      font-weight: 700;
      margin: 0 0 16px;
      color: var(--mat-sys-on-surface);
    }
    .details-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
    .detail-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 8px;
      background: var(--mat-sys-surface-container, #242424);
      font-size: 0.9rem;
    }
    .detail-label {
      font-weight: 600;
      color: var(--mat-sys-on-surface-variant, #a0a0a0);
    }
    .detail-value {
      color: var(--mat-sys-on-surface, #e0e0e0);
    }
    .detail-link {
      color: var(--mat-sys-primary, #90caf9);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-weight: 500;
    }
    .detail-link:hover {
      text-decoration: underline;
    }
    .inline-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
    }
    .section-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0 0 16px;
      color: var(--mat-sys-on-surface);
    }
    .description-text {
      font-size: 1.1rem;
      line-height: 1.8;
      white-space: pre-line;
      color: var(--mat-sys-on-surface-variant, #c5c5c5);
      margin-bottom: 40px;
    }
    .gallery-grid {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }
    .gallery-card {
      border-radius: 12px;
      overflow: hidden;
      background: #000;
      border-color: var(--mat-sys-outline-variant, #2a2a2a);
    }
    .gallery-img {
      width: 100%;
      height: auto;
      display: block;
      max-height: 700px;
      object-fit: contain;
      background: #000;
    }
    .gallery-caption {
      padding: 14px 16px;
      background: var(--mat-sys-surface-container-low, #181818);
    }
    .img-title {
      font-weight: 600;
      font-size: 1rem;
      margin-bottom: 4px;
      color: var(--mat-sys-on-surface, #ffffff);
    }
    .img-desc {
      font-size: 0.9rem;
      color: var(--mat-sys-on-surface-variant, #999999);
    }
    .not-found-page {
      text-align: center;
      padding: 80px 24px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly project = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return SITE_DATA.portfolioProjects.find((p) => p.slug === slug);
  });
}
