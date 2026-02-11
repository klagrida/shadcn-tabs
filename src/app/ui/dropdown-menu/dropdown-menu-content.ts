import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { Menu } from '@angular/aria/menu';
import { cn } from '../../utils';

@Component({
  selector: '[scDropdownMenuContent]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: Menu,
      inputs: ['id'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-content',
    '[class]': 'class()',
    '[attr.hidden]': 'menu.visible() ? null : true',
  },
  template: `<ng-content />`,
})
export class ScDropdownMenuContent {
  readonly menu = inject(Menu);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'absolute top-full left-0 mt-1',
      'bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto',
      this.classInput(),
    ),
  );
}
