import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scComboboxValue]',
  exportAs: 'scComboboxValue',
  host: {
    'data-slot': 'combobox-value',
    '[class]': 'class()',
  },
})
export class ScComboboxValue {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'px-3 py-2 text-sm select-none pointer-events-none',
      this.classInput(),
    ),
  );
}
