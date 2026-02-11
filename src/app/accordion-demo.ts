import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScAccordionGroup, ScAccordionItem, ScAccordionTrigger, ScAccordionPanel, ScAccordionContent } from './ui';

@Component({
  selector: 'accordion-demo',
  imports: [ScAccordionGroup, ScAccordionItem, ScAccordionTrigger, ScAccordionPanel, ScAccordionContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 space-y-8">
      <section>
        <h2 class="text-lg font-semibold mb-4">Accordion</h2>
        <div scAccordionGroup>
          <div scAccordionItem>
            <button scAccordionTrigger panelId="item-1">Is it accessible?</button>
            <div scAccordionPanel panelId="item-1">
              <ng-template scAccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </ng-template>
            </div>
          </div>
          <div scAccordionItem>
            <button scAccordionTrigger panelId="item-2">Is it styled?</button>
            <div scAccordionPanel panelId="item-2">
              <ng-template scAccordionContent>
                Yes. It comes with default styles that match the other components' aesthetic.
              </ng-template>
            </div>
          </div>
          <div scAccordionItem>
            <button scAccordionTrigger panelId="item-3">Is it animated?</button>
            <div scAccordionPanel panelId="item-3">
              <ng-template scAccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
              </ng-template>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class AccordionDemo {}
