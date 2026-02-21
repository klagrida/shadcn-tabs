import { Directive, inject } from '@angular/core';
import { Menu } from '@angular/aria/menu';

@Directive({
  selector: '[scMenu]',
  exportAs: 'scMenu',
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id', 'wrap', 'disabled', 'typeaheadDelay', 'expansionDelay'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    class:
      'bg-popover text-popover-foreground min-w-32 w-[15rem] rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden',
  },
})
export class ScMenu<V = string> {
  readonly menu = inject<Menu<V>>(Menu);
  readonly visible = this.menu.visible;
}
