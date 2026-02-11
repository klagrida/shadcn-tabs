import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scDropdownMenuSeparator]',
  host: {
    'data-slot': 'dropdown-menu-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScDropdownMenuSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('bg-border -mx-1 my-1 h-px', this.classInput()));
}
