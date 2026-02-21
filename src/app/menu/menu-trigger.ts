import { Directive, inject } from '@angular/core';
import { MenuTrigger } from '@angular/aria/menu';

@Directive({
  selector: '[scMenuTrigger]',
  exportAs: 'scMenuTrigger',
  hostDirectives: [
    {
      directive: MenuTrigger,
      inputs: ['menu'],
    },
  ],
  host: {
    class:
      'inline-flex cursor-pointer items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring',
  },
})
export class ScMenuTrigger {
  private readonly menuTrigger = inject(MenuTrigger);
  readonly expanded = this.menuTrigger.expanded;
}
