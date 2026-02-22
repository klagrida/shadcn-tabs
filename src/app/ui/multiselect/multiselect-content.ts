import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScMultiselect } from './multiselect';

@Directive({
  selector: '[scMultiselectContent]',
  exportAs: 'scMultiselectContent',
  host: {
    'data-slot': 'multiselect-content',
    '[class]': 'class()',
  },
})
export class ScMultiselectContent {
  readonly classInput = input<string>('', { alias: 'class' });
  private readonly multiselect = inject(ScMultiselect);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground mt-1 w-full rounded-lg p-1 shadow-md ring-1 ring-foreground/10 text-sm transition-all duration-150',
      this.multiselect.expanded()
        ? 'max-h-44 opacity-100 visible'
        : 'max-h-0 opacity-0 invisible overflow-hidden',
      this.classInput(),
    ),
  );
}
