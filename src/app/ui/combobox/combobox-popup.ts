import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

@Directive({
  selector: '[scComboboxPopup]',
  exportAs: 'scComboboxPopup',
  host: {
    'data-slot': 'combobox-popup',
    '[class]': 'class()',
  },
})
export class ScComboboxPopup {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly combobox = inject(ScCombobox);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground mt-1 w-full rounded-lg shadow-md ring-1 ring-foreground/10 text-sm transition-all duration-150',
      this.combobox.expanded()
        ? 'opacity-100 visible'
        : 'max-h-0 opacity-0 invisible overflow-hidden',
      this.classInput(),
    ),
  );
}
