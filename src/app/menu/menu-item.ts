import { Directive } from '@angular/core';
import { MenuItem } from '@angular/aria/menu';

@Directive({
  selector: '[scMenuItem]',
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['id', 'value', 'disabled', 'searchTerm', 'submenu'],
      outputs: ['searchTermChange'],
    },
  ],
  host: {
    class:
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring',
  },
})
export class ScMenuItem {}
