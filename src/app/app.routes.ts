import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'portfolio',
    loadComponent: () => import('./pages/portfolio.component').then((m) => m.PortfolioComponent),
  },
  {
    path: 'portfolio/:slug',
    loadComponent: () => import('./pages/project-detail.component').then((m) => m.ProjectDetailComponent),
  },
  {
    path: 'portfolio-collections/my-portfolio/:slug',
    redirectTo: 'portfolio/:slug',
  },
  {
    path: 'portfolio-collections/my-portfolio',
    redirectTo: 'portfolio',
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog.component').then((m) => m.BlogComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-post-detail.component').then((m) => m.BlogPostDetailComponent),
  },
  {
    path: 'post/:slug',
    redirectTo: 'blog/:slug',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
