import { Directive } from '@angular/core';
import { MenuTrigger } from '@angular/aria/menu';

@Directive({
  selector: '[scDropdownMenuTrigger]',
  hostDirectives: [
    {
      directive: MenuTrigger,
      inputs: ['menu', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-trigger',
  },
})
export class ScDropdownMenuTrigger {}
