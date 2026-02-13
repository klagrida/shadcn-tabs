import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scSelectSeparator]',
  host: {
    'data-slot': 'select-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScSelectSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn('bg-border -mx-1 my-1 h-px pointer-events-none', this.classInput()),
  );
}
