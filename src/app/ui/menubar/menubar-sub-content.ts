import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { Menu } from '@angular/aria/menu';
import { cn } from '../../utils';

@Component({
  selector: '[scMenubarSubContent]',
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
    'data-slot': 'menubar-sub-content',
    '[class]': 'class()',
  },
  template: `<ng-content />`,
})
export class ScMenubarSubContent {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() =>
    cn(
      'data-[visible=false]:hidden',
      'bg-popover text-popover-foreground min-w-32 rounded-lg p-1 shadow-lg ring-1 ring-foreground/10 z-50 overflow-hidden',
      this.classInput(),
    ),
  );
}
