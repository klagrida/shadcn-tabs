import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: 'ng-template[scDropdownMenuPopover]',
})
export class ScDropdownMenuPopover {
  readonly templateRef = inject(TemplateRef);
}
