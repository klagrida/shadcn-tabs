import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scSelectLabel]',
  host: {
    'data-slot': 'select-label',
    '[class]': 'class()',
  },
})
export class ScSelectLabel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('text-muted-foreground px-1.5 py-1 text-xs', this.classInput()));
}
