import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { AboutComponent } from './pages/about.component';
import { getCurrentAge } from './site-data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render brand name', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('Luke Shore');
  });
});

describe('AboutComponent & Dynamic Age', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should calculate current age from birth year 2001', () => {
    const currentYear = new Date().getFullYear();
    expect(getCurrentAge(2001)).toBe(currentYear - 2001);
  });

  it('should dynamically display calculated age in about bio', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const expectedAge = new Date().getFullYear() - 2001;
    const firstPara = compiled.querySelector('.bio-para')?.textContent;
    expect(firstPara).toContain(`I am Currently ${expectedAge} years old.`);
  });
});
