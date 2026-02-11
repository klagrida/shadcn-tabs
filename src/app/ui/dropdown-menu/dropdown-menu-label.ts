import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scDropdownMenuLabel]',
  host: {
    'data-slot': 'dropdown-menu-label',
    '[attr.data-inset]': 'inset()',
    '[class]': 'class()',
  },
})
export class ScDropdownMenuLabel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input(false);

  readonly class = computed(() =>
    cn('text-muted-foreground px-1.5 py-1 text-xs font-medium data-inset:pl-7', this.classInput()),
  );
}
