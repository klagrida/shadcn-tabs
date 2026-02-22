import { computed, Directive, input } from '@angular/core';
import { Option } from '@angular/aria/listbox';
import { cn } from '../../utils';

@Directive({
  selector: '[scMultiselectOption]',
  exportAs: 'scMultiselectOption',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'multiselect-option',
    '[class]': 'class()',
  },
})
export class ScMultiselectOption {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:bg-primary/5 aria-selected:text-primary flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-hidden select-none hover:bg-accent/50',
      this.classInput(),
    ),
  );
}
