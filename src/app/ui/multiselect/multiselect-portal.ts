import { Directive, inject, signal, TemplateRef } from '@angular/core';
import type { Combobox } from '@angular/aria/combobox';

@Directive({
  selector: '[scMultiselectPortal]',
})
export class ScMultiselectPortal {
  readonly templateRef = inject(TemplateRef);
  readonly combobox = signal<Combobox<unknown> | undefined>(undefined);
}
