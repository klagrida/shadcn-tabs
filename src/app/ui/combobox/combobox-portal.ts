import { Directive, inject, signal, TemplateRef } from '@angular/core';
import type { Combobox } from '@angular/aria/combobox';

@Directive({
  selector: '[scComboboxPortal]',
})
export class ScComboboxPortal {
  readonly templateRef = inject(TemplateRef);
  readonly combobox = signal<Combobox<unknown> | undefined>(undefined);
}
