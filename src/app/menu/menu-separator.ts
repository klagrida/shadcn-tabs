import { Directive } from '@angular/core';

@Directive({
  selector: '[scMenuSeparator]',
  host: {
    role: 'separator',
    'aria-orientation': 'horizontal',
    class: 'bg-border -mx-1 my-1 h-px',
  },
})
export class ScMenuSeparator {}
