import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SITE_DATA } from '../site-data';

@Component({
  selector: 'app-blog',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="blog-page">
      <div class="container">
        <header class="blog-header">
          <h1 class="page-title">Blog</h1>
          <p class="page-desc">Thoughts, experiments, and developer logs from my journey in programming.</p>
        </header>

        <div class="posts-list">
          @for (post of posts; track post.slug) {
            <mat-card class="post-card" appearance="outlined">
              <div class="post-inner">
                @if (post.images.length > 0) {
                  <div class="post-thumb-wrap">
                    <img [src]="post.images[0].localPath" [alt]="post.title" class="post-thumb" loading="lazy" />
                  </div>
                }
                <div class="post-info">
                  <div class="post-meta">
                    <span class="meta-date">{{ post.dateShort }}</span>
                    <span class="meta-dot">·</span>
                    <span class="meta-author">{{ post.author }}</span>
                    <span class="meta-dot">·</span>
                    <span class="meta-time">{{ post.minutesToRead }} min read</span>
                  </div>
                  <h2 class="post-title">
                    <a [routerLink]="['/blog', post.slug]">{{ post.title }}</a>
                  </h2>
                  <p class="post-excerpt">{{ post.excerpt }}</p>
                  <div class="post-action">
                    <a mat-button color="primary" [routerLink]="['/blog', post.slug]">
                      Read Post
                      <mat-icon iconPositionEnd>arrow_forward</mat-icon>
                    </a>
                  </div>
                </div>
              </div>
            </mat-card>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-page {
      padding: 48px 24px;
      min-height: calc(100vh - 72px);
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    .blog-header {
      margin-bottom: 40px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
      padding-bottom: 24px;
    }
    .page-title {
      font-size: 2.4rem;
      font-weight: 700;
      margin: 0 0 12px;
      color: var(--mat-sys-on-surface);
    }
    .page-desc {
      font-size: 1.15rem;
      color: var(--mat-sys-on-surface-variant, #666);
      margin: 0;
    }
    .posts-list {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .post-card {
      border-radius: 12px;
      overflow: hidden;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .post-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    }
    .post-inner {
      display: flex;
      gap: 24px;
      padding: 20px;
    }
    @media (max-width: 650px) {
      .post-inner {
        flex-direction: column;
      }
    }
    .post-thumb-wrap {
      width: 180px;
      height: 130px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      background: #111;
    }
    @media (max-width: 650px) {
      .post-thumb-wrap {
        width: 100%;
        height: 180px;
      }
    }
    .post-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .post-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .post-meta {
      font-size: 0.85rem;
      color: var(--mat-sys-on-surface-variant, #777);
      margin-bottom: 8px;
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .post-title {
      font-size: 1.35rem;
      font-weight: 600;
      margin: 0 0 10px;
      line-height: 1.35;
    }
    .post-title a {
      color: var(--mat-sys-on-surface);
      text-decoration: none;
    }
    .post-title a:hover {
      color: var(--mat-sys-primary);
      text-decoration: underline;
    }
    .post-excerpt {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--mat-sys-on-surface-variant, #555);
      margin: 0 0 14px;
      flex: 1;
    }
    .post-action {
      margin-top: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  protected readonly posts = SITE_DATA.blogPosts;
}
