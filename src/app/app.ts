import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsDemo } from './tabs-demo';
import { AccordionDemo } from './accordion-demo';

@Component({
  selector: 'app-root',
  imports: [TabsDemo, AccordionDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 space-y-8">
      <tabs-demo />
      <accordion-demo />
    </div>
  `,
})
export class App {}
