import { Directive } from '@angular/core';
import { MenuContent } from '@angular/aria/menu';

@Directive({
  selector: 'ng-template[scDropdownMenuContentTemplate]',
  hostDirectives: [MenuContent],
})
export class ScDropdownMenuContentTemplate {}
