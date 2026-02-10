import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { TabPanel } from '@angular/aria/tabs';
import { cn } from '../utils';

@Component({
  selector: '[scTabPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: TabPanel,
      inputs: ['value', 'id'],
    },
  ],
  host: {
    'data-slot': 'tabs-content',
    '[class]': 'class()',
    '[hidden]': '!tabPanel.visible()',
  },
  template: `<ng-content />`,
})
export class ScTabPanel {
  protected readonly tabPanel = inject(TabPanel);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('text-sm flex-1 outline-none', this.classInput()));
}
