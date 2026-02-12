import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { Menu } from '@angular/aria/menu';
import { cn } from '../../utils';

@Component({
  selector: '[scMenubarContent]',
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
    'data-slot': 'menubar-content',
    '[class]': 'class()',
  },
  template: `<ng-content />`,
})
export class ScMenubarContent {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'data-[visible=false]:hidden',
      'bg-popover text-popover-foreground min-w-36 rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto',
      this.classInput(),
    ),
  );
}
