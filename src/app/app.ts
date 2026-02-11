import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabsDemo } from './tabs-demo';
import { AccordionDemo } from './accordion-demo';
import { DropdownMenuDemo } from './dropdown-menu-demo';

@Component({
  selector: 'app-root',
  imports: [TabsDemo, AccordionDemo, DropdownMenuDemo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 space-y-8">
      <tabs-demo />
      <accordion-demo />
      <dropdown-menu-demo />
    </div>
  `,
})
export class App {}
