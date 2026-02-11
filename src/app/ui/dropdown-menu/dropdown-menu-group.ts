import { Directive } from '@angular/core';

@Directive({
  selector: '[scDropdownMenuGroup]',
  host: {
    'data-slot': 'dropdown-menu-group',
    role: 'group',
  },
})
export class ScDropdownMenuGroup {}
