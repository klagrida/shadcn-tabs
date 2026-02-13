import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadComponent: () => import('./tabs-demo').then(m => m.TabsDemo) },
  { path: 'accordion', loadComponent: () => import('./accordion-demo').then(m => m.AccordionDemo) },
  { path: 'dropdown-menu', loadComponent: () => import('./dropdown-menu-demo').then(m => m.DropdownMenuDemo) },
  { path: 'menubar', loadComponent: () => import('./menubar-demo').then(m => m.MenubarDemo) },
  { path: 'select', loadComponent: () => import('./select-demo').then(m => m.SelectDemo) },
];
