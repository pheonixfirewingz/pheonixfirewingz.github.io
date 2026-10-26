import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SITE_DATA } from '../site-data';

@Component({
  selector: 'app-portfolio',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatIconModule],
  template: `
    <div class="portfolio-page">
      <div class="container">
        <header class="portfolio-header">
          <h1 class="page-title">{{ title }}</h1>
          <p class="page-desc">{{ description }}</p>
        </header>

        <div class="projects-grid">
          @for (project of projects; track project.slug) {
            <mat-card class="project-card" appearance="outlined">
              <div class="card-image-wrap">
                <img
                  [src]="project.images[0]?.localPath || ''"
                  [alt]="project.title"
                  class="project-thumb"
                  loading="lazy"
                />
              </div>
              <mat-card-header>
                <mat-card-title>{{ project.title }}</mat-card-title>
                <mat-card-subtitle>{{ getProjectSubtitle(project) }}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <p class="project-snippet">{{ project.description }}</p>
              </mat-card-content>
              <mat-card-actions align="end">
                <a mat-button color="primary" [routerLink]="['/portfolio', project.slug]">
                  View Project Details
                  <mat-icon iconPositionEnd>arrow_forward</mat-icon>
                </a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .portfolio-page {
      padding: 48px 24px;
      min-height: calc(100vh - 72px);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .portfolio-header {
      margin-bottom: 40px;
      text-align: center;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .page-title {
      font-size: 2.4rem;
      font-weight: 700;
      margin: 0 0 12px;
      color: var(--mat-sys-on-surface);
    }
    .page-desc {
      font-size: 1.15rem;
      color: var(--mat-sys-on-surface-variant, #a0a0a0);
      line-height: 1.6;
      margin: 0;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 32px;
    }
    @media (max-width: 600px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
    .project-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-radius: 12px;
      overflow: hidden;
      background: var(--mat-sys-surface-container-low, #181818);
      border-color: var(--mat-sys-outline-variant, #2a2a2a);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .project-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
    }
    .card-image-wrap {
      width: 100%;
      height: 200px;
      background: #000;
      overflow: hidden;
    }
    .project-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s;
    }
    .project-card:hover .project-thumb {
      transform: scale(1.03);
    }
    mat-card-header {
      padding-top: 16px;
    }
    mat-card-content {
      flex: 1;
      padding-top: 12px;
    }
    .project-snippet {
      font-size: 0.95rem;
      line-height: 1.55;
      color: var(--mat-sys-on-surface-variant, #b5b5b5);
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    mat-card-actions {
      padding: 8px 16px 16px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  protected readonly title = SITE_DATA.pages.portfolio.collectionTitle;
  protected readonly description = SITE_DATA.pages.portfolio.collectionDescription;
  protected readonly projects = SITE_DATA.portfolioProjects;

  protected getProjectSubtitle(project: typeof SITE_DATA.portfolioProjects[0]): string {
    const typeDetail = project.details.find((d) => d.label === 'Project type');
    const dateDetail = project.details.find((d) => d.label === 'Date');
    const parts: string[] = [];
    if (typeDetail) parts.push(typeDetail.text);
    if (dateDetail) parts.push(dateDetail.text);
    return parts.join(' · ');
  }
}
