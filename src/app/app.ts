import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 space-y-8">
      <nav class="flex gap-2">
        @for (link of links; track link.path) {
          <a
            [routerLink]="link.path"
            routerLinkActive="bg-primary text-primary-foreground"
            class="rounded-md px-3 py-1.5 text-sm font-medium hover:bg-muted"
          >
            {{ link.label }}
          </a>
        }
      </nav>
      <router-outlet />
    </div>
  `,
})
export class App {
  readonly links = [
    { path: '/tabs', label: 'Tabs' },
    { path: '/accordion', label: 'Accordion' },
    { path: '/dropdown-menu', label: 'Dropdown Menu' },
    { path: '/menu', label: 'Menu' },
    { path: '/menubar', label: 'Menubar' },
    { path: '/select', label: 'Select' },
    { path: '/multiselect', label: 'Multiselect' },
    { path: '/combobox', label: 'Combobox' },
  ];
}
