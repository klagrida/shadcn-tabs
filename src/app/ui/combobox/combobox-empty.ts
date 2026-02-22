import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scComboboxEmpty]',
  exportAs: 'scComboboxEmpty',
  host: {
    'data-slot': 'combobox-empty',
    '[class]': 'class()',
  },
})
export class ScComboboxEmpty {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('p-4 text-sm text-muted-foreground', this.classInput()),
  );
}
