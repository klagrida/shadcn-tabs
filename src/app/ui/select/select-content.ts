import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { Combobox } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { cn } from '../../utils';

@Component({
  selector: '[scSelectContent]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: Listbox,
      inputs: ['values', 'orientation'],
      outputs: ['valuesChange'],
    },
  ],
  host: {
    'data-slot': 'select-content',
    '[class]': 'class()',
  },
  template: `<ng-content />`,
})
export class ScSelectContent {
  private readonly combobox = inject(Combobox);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly class = computed(() =>
    cn(
      this.combobox.expanded() ? '' : 'hidden',
      'bg-popover text-popover-foreground',
      'absolute top-full left-0 mt-1 z-50 min-w-full',
      'max-h-60 overflow-x-hidden overflow-y-auto',
      'rounded-lg p-1 shadow-md ring-1 ring-foreground/10',
      this.classInput(),
    ),
  );
}
