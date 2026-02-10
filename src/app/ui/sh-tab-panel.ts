import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TabPanel } from '@angular/aria/tabs';
import { cn } from '../utils';

@Component({
  selector: '[shTabPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: TabPanel,
      inputs: ['value', 'id'],
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
  template: `<ng-content />`,
})
export class ShTabPanel {
  readonly class = input<string>('');
  readonly computedClass = computed(() => cn('text-sm flex-1 outline-none', this.class()));
}
