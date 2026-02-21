import { Directive, inject, signal, TemplateRef } from '@angular/core';
import type { Menu } from '@angular/aria/menu';

@Directive({
  selector: '[scMenuSubmenuPortal]',
})
export class ScMenuSubmenuPortal {
  readonly templateRef = inject(TemplateRef);
  readonly menu = signal<Menu<unknown> | undefined>(undefined);
}
