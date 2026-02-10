import { Directive } from '@angular/core';
import { TabContent } from '@angular/aria/tabs';

@Directive({
  selector: 'ng-template[shTabContent]',
  hostDirectives: [TabContent],
})
export class ShTabContent {}
