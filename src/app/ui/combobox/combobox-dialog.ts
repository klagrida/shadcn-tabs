import { computed, Directive, input } from '@angular/core';
import { ComboboxDialog } from '@angular/aria/combobox';
import { cn } from '../../utils';

@Directive({
  selector: '[scComboboxDialog]',
  exportAs: 'scComboboxDialog',
  hostDirectives: [ComboboxDialog],
  host: {
    'data-slot': 'combobox-dialog',
    '[class]': 'class()',
  },
})
export class ScComboboxDialog {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'absolute p-0 border border-input rounded-lg bg-popover text-popover-foreground shadow-md backdrop:opacity-0',
      this.classInput(),
    ),
  );
}
