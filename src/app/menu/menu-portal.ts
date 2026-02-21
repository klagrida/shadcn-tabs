import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[scMenuPortal]',
})
export class ScMenuPortal {
  readonly templateRef = inject(TemplateRef);
}
