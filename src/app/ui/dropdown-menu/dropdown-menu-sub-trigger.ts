import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@angular/aria/menu';
import { cn } from '../../utils';

@Component({
  selector: '[scDropdownMenuSubTrigger]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'disabled', 'id', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'dropdown-menu-sub-trigger',
    '[attr.data-inset]': 'inset()',
    '[class]': 'hostClass()',
  },
  template: `<ng-content />`,
})
export class ScDropdownMenuSubTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input(false);
  readonly element = inject(ElementRef);

  readonly hostClass = computed(() =>
    cn(
      'focus:bg-accent focus:text-accent-foreground',
      'data-open:bg-accent data-open:text-accent-foreground',
      'not-data-[variant=destructive]:focus:**:text-accent-foreground',
      'gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7',
      '[&_svg:not([class*=size-])]:size-4',
      'group/dropdown-menu-item relative flex cursor-default items-center outline-hidden select-none',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
