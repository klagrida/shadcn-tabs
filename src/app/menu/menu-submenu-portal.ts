import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[scMenuSubmenuPortal]',
})
export class ScMenuSubmenuPortal {
  readonly templateRef = inject(TemplateRef);
}
