import {
  afterRenderEffect,
  computed,
  contentChildren,
  Directive,
  inject,
  input,
} from '@angular/core';
import { Listbox, Option } from '@angular/aria/listbox';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

@Directive({
  selector: '[scComboboxList]',
  exportAs: 'scComboboxList',
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['multi', 'disabled', 'wrap', 'typeaheadDelay', 'values'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    'data-slot': 'combobox-list',
    '[class]': 'class()',
  },
})
export class ScComboboxList<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly listbox = inject<Listbox<V>>(Listbox);
  private readonly combobox = inject(ScCombobox);
  private readonly options = contentChildren<Option<V>>(Option);

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5 max-h-52 overflow-auto p-1', this.classInput()),
  );

  constructor() {
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
    });

    afterRenderEffect(() => {
      if (!this.combobox.expanded()) {
        setTimeout(() => this.listbox.element.scrollTo(0, 0), 150);
      }
    });
  }
}
