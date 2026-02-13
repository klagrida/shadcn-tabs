import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scSelectGroup]',
  host: {
    'data-slot': 'select-group',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScSelectGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('scroll-my-1 p-1', this.classInput()));
}
