import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@angular/aria/menu';
import { cn } from '../../utils';
import { menubarItemBaseStyles } from './menubar-item';

@Component({
  selector: '[scMenubarSubTrigger]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'disabled', 'id', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'menubar-sub-trigger',
    '[attr.data-inset]': 'inset()',
    '[class]': 'hostClass()',
  },
  template: `<ng-content />`,
})
export class ScMenubarSubTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input(false);
  readonly element = inject(ElementRef);

  readonly hostClass = computed(() =>
    cn(
      ...menubarItemBaseStyles,
      'data-open:bg-accent data-open:text-accent-foreground',
      this.classInput(),
    ),
  );
}
