import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMultiselectValue]',
  exportAs: 'scMultiselectValue',
  host: {
    'data-slot': 'multiselect-value',
    '[class]': 'class()',
  },
})
export class ScMultiselectValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-2 left-2.5 flex absolute items-center pointer-events-none text-sm select-none',
      this.classInput(),
    ),
  );
}
