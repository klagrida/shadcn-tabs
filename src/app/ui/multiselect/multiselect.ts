import { computed, Directive, inject, input } from '@angular/core';
import { Combobox } from '@angular/aria/combobox';
import { cn } from '../../utils';
import { ScMultiselectPortal } from './multiselect-portal';

@Directive({
  selector: '[scMultiselect]',
  exportAs: 'scMultiselect',
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['filterMode', 'disabled', 'readonly', 'alwaysExpanded'],
    },
  ],
  host: {
    'data-slot': 'multiselect',
    '[class]': 'class()',
  },
})
export class ScMultiselect<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly combobox = inject<Combobox<V>>(Combobox);
  readonly expanded = this.combobox.expanded;

  protected readonly class = computed(() =>
    cn('contents', this.classInput()),
  );

  constructor() {
    const portal = inject(ScMultiselectPortal, { optional: true });
    portal?.combobox.set(this.combobox as Combobox<unknown>);
  }
}
