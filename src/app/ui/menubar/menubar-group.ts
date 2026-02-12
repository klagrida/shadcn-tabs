import { Directive } from '@angular/core';

@Directive({
  selector: '[scMenubarGroup]',
  host: {
    'data-slot': 'menubar-group',
    role: 'group',
  },
})
export class ScMenubarGroup {}
