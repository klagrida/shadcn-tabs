import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenubarSeparator]',
  host: {
    'data-slot': 'menubar-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScMenubarSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('bg-border -mx-1 my-1 h-px', this.classInput()));
}
