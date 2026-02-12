import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scMenubarPortal]',
})
export class ScMenubarPortal {
  readonly templateRef = inject(TemplateRef);
}
