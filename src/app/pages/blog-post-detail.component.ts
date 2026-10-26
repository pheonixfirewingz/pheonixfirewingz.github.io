import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SITE_DATA } from '../site-data';

@Component({
  selector: 'app-blog-post-detail',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    @if (post(); as p) {
      <div class="post-detail-page">
        <div class="container">
          <nav class="breadcrumb">
            <a mat-button routerLink="/blog">
              <mat-icon>arrow_back</mat-icon>
              Back to Blog
            </a>
          </nav>

          <article class="post-article">
            <header class="post-header">
              <h1 class="post-title">{{ p.title }}</h1>
              <div class="post-meta">
                <span class="meta-author">{{ p.author }}</span>
                <span class="meta-dot">·</span>
                <span class="meta-date">{{ p.dateShort }}</span>
                <span class="meta-dot">·</span>
                <span class="meta-time">{{ p.minutesToRead }} min read</span>
              </div>
            </header>

            <div class="post-content">
              @for (block of p.blocks; track $index) {
                @if (block.type === 'image') {
                  <figure class="post-figure">
                    <img [src]="block.localPath" [alt]="block.alt || p.title" class="post-img" />
                    @if (block.alt) {
                      <figcaption class="post-caption">{{ block.alt }}</figcaption>
                    }
                  </figure>
                } @else if (block.type === 'h2' || block.type === 'h3') {
                  <h2 class="sub-heading">{{ block.text }}</h2>
                } @else {
                  <p class="post-para">{{ block.text }}</p>
                }
              }
            </div>
          </article>
        </div>
      </div>
    } @else {
      <div class="not-found-page">
        <h2>Post Not Found</h2>
        <a mat-flat-button routerLink="/blog">Back to Blog</a>
      </div>
    }
  `,
  styles: [`
    .post-detail-page {
      padding: 32px 24px 64px;
      min-height: calc(100vh - 72px);
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    .breadcrumb {
      margin-bottom: 24px;
    }
    .post-header {
      margin-bottom: 36px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
      padding-bottom: 24px;
    }
    .post-title {
      font-size: 2.2rem;
      font-weight: 700;
      line-height: 1.3;
      margin: 0 0 16px;
      color: var(--mat-sys-on-surface);
    }
    .post-meta {
      font-size: 0.95rem;
      color: var(--mat-sys-on-surface-variant, #666);
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .meta-author {
      font-weight: 500;
      color: var(--mat-sys-primary);
    }
    .post-content {
      font-size: 1.1rem;
      line-height: 1.8;
      color: var(--mat-sys-on-surface-variant, #333);
    }
    .post-para {
      margin-bottom: 24px;
    }
    .sub-heading {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 36px 0 16px;
      color: var(--mat-sys-on-surface);
    }
    .post-figure {
      margin: 32px 0;
      border-radius: 10px;
      overflow: hidden;
      background: #111;
    }
    .post-img {
      width: 100%;
      height: auto;
      display: block;
    }
    .post-caption {
      padding: 10px 16px;
      font-size: 0.9rem;
      color: #888;
      text-align: center;
      background: #1a1a1a;
    }
    .not-found-page {
      text-align: center;
      padding: 80px 24px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostDetailComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly post = computed(() => {
    const slug = this.route.snapshot.paramMap.get('slug');
    return SITE_DATA.blogPosts.find((p) => p.slug === slug);
  });
}
