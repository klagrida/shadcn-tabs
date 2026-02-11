import { Directive } from '@angular/core';
import { MenuContent } from '@angular/aria/menu';

@Directive({
  selector: 'ng-template[scDropdownMenuContent]',
  hostDirectives: [MenuContent],
})
export class ScDropdownMenuContent {}
