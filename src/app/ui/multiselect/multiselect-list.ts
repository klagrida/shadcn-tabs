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
import { ScMultiselect } from './multiselect';

@Directive({
  selector: '[scMultiselectList]',
  exportAs: 'scMultiselectList',
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['multi', 'disabled', 'wrap', 'typeaheadDelay'],
    },
  ],
  host: {
    'data-slot': 'multiselect-list',
    '[class]': 'class()',
  },
})
export class ScMultiselectList<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly listbox = inject<Listbox<V>>(Listbox);
  private readonly multiselect = inject(ScMultiselect);
  private readonly options = contentChildren<Option<V>>(Option);

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5 h-full overflow-auto', this.classInput()),
  );

  constructor() {
    // Scrolls to the active item when the active option changes.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.multiselect.expanded()) {
        setTimeout(() => this.listbox.element.scrollTo(0, 0), 150);
      }
    });
  }
}
