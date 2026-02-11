import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scDropdownMenuPortal]',
})
export class ScDropdownMenuPortal {
  readonly templateRef = inject(TemplateRef);
}
