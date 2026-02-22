import { computed, Directive, input } from '@angular/core';
import { Listbox } from '@angular/aria/listbox';
import { cn } from '../../utils';

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
export class ScMultiselectList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5 h-full overflow-auto', this.classInput()),
  );
}
