import { Directive, inject } from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { MenuTrigger } from '@angular/aria/menu';

@Directive({
  selector: '[scMenuTrigger]',
  exportAs: 'scMenuTrigger',
  hostDirectives: [
    {
      directive: MenuTrigger,
    },
    CdkOverlayOrigin,
  ],
  host: {
    class:
      'inline-flex cursor-pointer items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring',
  },
})
export class ScMenuTrigger {
  readonly trigger = inject(MenuTrigger);
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly expanded = this.trigger.expanded;
}
