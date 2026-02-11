import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { AccordionPanel } from '@angular/aria/accordion';
import { cn } from '../../utils';

@Component({
  selector: '[scAccordionPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: AccordionPanel,
      inputs: ['panelId', 'id'],
    },
  ],
  host: {
    'data-slot': 'accordion-content',
    '[class]': 'class()',
  },
  template: `
    <div class="pt-0 pb-2.5">
      <ng-content />
    </div>
  `,
})
export class ScAccordionPanel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('text-sm [&[inert]]:hidden', this.classInput()));
}
