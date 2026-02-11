import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scDropdownMenuShortcut]',
  host: {
    'data-slot': 'dropdown-menu-shortcut',
    '[class]': 'class()',
  },
})
export class ScDropdownMenuShortcut {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground ml-auto text-xs tracking-widest',
      this.classInput(),
    ),
  );
}
