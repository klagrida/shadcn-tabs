import { Directive } from '@angular/core';
import { MenuContent } from '@angular/aria/menu';

@Directive({
  selector: 'ng-template[scMenubarContentDef]',
  hostDirectives: [MenuContent],
})
export class ScMenubarContentDef {}
