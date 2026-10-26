import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { SITE_DATA, getCurrentAge } from '../site-data';

@Component({
  selector: 'app-about',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule],
  template: `
    <div class="about-page">
      <div class="container">
        <header class="page-header">
          <h1 class="page-title">About</h1>
          <h2 class="page-subtitle">{{ name }}</h2>
        </header>

        <div class="content-grid">
          <div class="bio-section">
            @for (para of paragraphs; track $index) {
              <p class="bio-para">{{ para }}</p>
            }
          </div>

          <aside class="sidebar-section">
            <mat-card class="contact-card" appearance="outlined">
              <mat-card-header>
                <mat-card-title>Send Me A Message</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="direct-contact">
                  <div class="contact-item">
                    <mat-icon>email</mat-icon>
                    <a [href]="'mailto:' + email">{{ email }}</a>
                  </div>
                  <div class="contact-item">
                    <mat-icon>share</mat-icon>
                    <span>Social Media Channels</span>
                  </div>
                  <div class="social-chips">
                    @for (social of socialLinks; track social.platform) {
                      <a [href]="social.url" target="_blank" rel="noopener noreferrer" class="social-chip">
                        <img [src]="social.iconLocalPath" [alt]="social.platform" class="social-icon" />
                        <span>{{ social.platform }}</span>
                      </a>
                    }
                  </div>
                </div>

                <form class="contact-form" (submit)="onSubmit($event)">
                  <div class="form-row">
                    <mat-form-field appearance="outline">
                      <mat-label>First Name</mat-label>
                      <input matInput [(ngModel)]="firstName" name="firstName" required />
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                      <mat-label>Last Name</mat-label>
                      <input matInput [(ngModel)]="lastName" name="lastName" />
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Email</mat-label>
                    <input matInput type="email" [(ngModel)]="contactEmail" name="email" required />
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Message</mat-label>
                    <textarea matInput rows="4" [(ngModel)]="message" name="message" required></textarea>
                  </mat-form-field>

                  @if (submitted()) {
                    <div class="success-banner">
                      <mat-icon>check_circle</mat-icon>
                      <span>Thanks for submitting!</span>
                    </div>
                  } @else {
                    <button mat-flat-button color="primary" type="submit" class="submit-btn">
                      Send
                    </button>
                  }
                </form>
              </mat-card-content>
            </mat-card>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-page {
      padding: 48px 24px;
      min-height: calc(100vh - 72px);
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    .page-header {
      margin-bottom: 36px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #2a2a2a);
      padding-bottom: 20px;
    }
    .page-title {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0 0 8px;
      color: var(--mat-sys-on-surface);
    }
    .page-subtitle {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 0;
      color: var(--mat-sys-primary);
    }
    .content-grid {
      display: grid;
      grid-template-columns: 1fr 380px;
      gap: 48px;
      align-items: start;
    }
    @media (max-width: 900px) {
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
    .bio-para {
      font-size: 1.05rem;
      line-height: 1.75;
      margin-bottom: 24px;
      color: var(--mat-sys-on-surface-variant, #c5c5c5);
    }
    .contact-card {
      padding: 12px;
      border-radius: 12px;
      background: var(--mat-sys-surface-container-low, #181818);
    }
    .direct-contact {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--mat-sys-outline-variant, #2a2a2a);
    }
    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 0.95rem;
    }
    .contact-item a {
      color: var(--mat-sys-primary);
      text-decoration: none;
    }
    .contact-item a:hover {
      text-decoration: underline;
    }
    .social-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 12px;
    }
    .social-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 20px;
      background: var(--mat-sys-surface-container, #242424);
      color: var(--mat-sys-on-surface, #e0e0e0);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
      transition: background 0.2s;
    }
    .social-chip:hover {
      background: var(--mat-sys-surface-container-high, #303030);
    }
    .social-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .full-width {
      width: 100%;
    }
    .submit-btn {
      width: 100%;
      height: 44px;
      margin-top: 8px;
    }
    .success-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px;
      border-radius: 8px;
      background: rgba(46, 125, 50, 0.2);
      color: #81c784;
      font-weight: 500;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly name = SITE_DATA.pages.about.subheading;
  protected readonly currentAge = getCurrentAge();
  protected readonly paragraphs = SITE_DATA.pages.about.paragraphs.map(p =>
    p.replace(/I am Currently \d+ years old\./i, `I am Currently ${this.currentAge} years old.`)
  );
  protected readonly email = SITE_DATA.pages.about.contactSection.email;
  protected readonly socialLinks = SITE_DATA.socialLinks;

  protected firstName = '';
  protected lastName = '';
  protected contactEmail = '';
  protected message = '';
  protected readonly submitted = signal(false);

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.firstName && this.contactEmail && this.message) {
      this.submitted.set(true);
    }
  }
}
