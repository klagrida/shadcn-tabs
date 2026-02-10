import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Tabs } from '@angular/aria/tabs';
import { cn } from '../utils';

@Component({
  selector: '[shTabs]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: Tabs,
    },
  ],
  host: {
    '[class]': 'computedClass()',
    '[attr.data-orientation]': 'orientation()',
  },
  template: `<ng-content />`,
})
export class ShTabs {
  readonly class = input<string>('');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly computedClass = computed(() =>
    cn('gap-2 flex', this.orientation() === 'horizontal' ? 'flex-col' : 'flex-row', this.class()),
  );
}
