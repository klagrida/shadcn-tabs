import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AccordionPanel } from '@angular/aria/accordion';
import { cn } from '../../utils';
import { ScAccordionContent } from './accordion-content';

@Component({
  selector: '[scAccordionPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgTemplateOutlet],
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
    @if (panel.visible()) {
      <div class="overflow-hidden" animate.enter="animate-accordion-down" animate.leave="animate-accordion-up">
        <div class="pt-0 pb-2.5">
          <ng-container [ngTemplateOutlet]="contentTemplate()" />
        </div>
      </div>
    }
  `,
})
export class ScAccordionPanel {
  readonly panel = inject(AccordionPanel);
  readonly contentTemplate = contentChild.required(ScAccordionContent, { read: TemplateRef });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly class = computed(() => cn('text-sm', this.classInput()));
}
