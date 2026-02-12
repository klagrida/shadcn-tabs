import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@angular/aria/menu';
import { cn } from '../../utils';

@Component({
  selector: '[scMenubarTrigger]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'disabled', 'id', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'menubar-trigger',
    '[class]': 'class()',
  },
  template: `<ng-content />`,
})
export class ScMenubarTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly element = inject(ElementRef);

  readonly class = computed(() =>
    cn(
      'flex items-center rounded-sm px-1.5 py-[2px] text-sm font-medium outline-hidden select-none',
      'hover:bg-muted aria-expanded:bg-muted',
      this.classInput(),
    ),
  );
}
