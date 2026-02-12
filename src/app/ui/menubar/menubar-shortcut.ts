import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenubarShortcut]',
  host: {
    'data-slot': 'menubar-shortcut',
    '[class]': 'class()',
  },
})
export class ScMenubarShortcut {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'text-muted-foreground group-data-[active=true]/menubar-item:text-accent-foreground ml-auto text-xs tracking-widest',
      this.classInput(),
    ),
  );
}
