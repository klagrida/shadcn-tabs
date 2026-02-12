import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenubarLabel]',
  host: {
    'data-slot': 'menubar-label',
    '[attr.data-inset]': 'inset()',
    '[class]': 'class()',
  },
})
export class ScMenubarLabel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input(false);

  readonly class = computed(() =>
    cn('px-1.5 py-1 text-sm font-medium data-inset:pl-7', this.classInput()),
  );
}
