import { ChangeDetectionStrategy, Component, computed, viewChild } from '@angular/core';
import { Listbox } from '@angular/aria/listbox';
import {
  ScSelect,
  ScSelectTrigger,
  ScSelectValue,
  ScSelectContent,
  ScSelectItem,
  ScSelectGroup,
  ScSelectLabel,
  ScSelectSeparator,
} from './ui';

@Component({
  selector: 'select-demo',
  imports: [
    ScSelect,
    ScSelectTrigger,
    ScSelectValue,
    ScSelectContent,
    ScSelectItem,
    ScSelectGroup,
    ScSelectLabel,
    ScSelectSeparator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h2 class="text-lg font-semibold mb-4">Select</h2>

      <sc-select>
        <sc-select-trigger ariaLabel="Select a fruit">
          <sc-select-value [placeholder]="'Select a fruit'">
            {{ displayValue() }}
          </sc-select-value>
        </sc-select-trigger>

        <div scSelectContent>
          <div scSelectGroup>
            <div scSelectLabel>Fruits</div>
            <div scSelectItem value="apple" label="Apple">Apple</div>
            <div scSelectItem value="banana" label="Banana">Banana</div>
            <div scSelectItem value="blueberry" label="Blueberry">Blueberry</div>
            <div scSelectItem value="grapes" label="Grapes">Grapes</div>
            <div scSelectItem value="pineapple" label="Pineapple">Pineapple</div>
          </div>
          <div scSelectSeparator></div>
          <div scSelectGroup>
            <div scSelectLabel>Vegetables</div>
            <div scSelectItem value="aubergine" label="Aubergine">Aubergine</div>
            <div scSelectItem value="broccoli" label="Broccoli">Broccoli</div>
            <div scSelectItem value="carrot" label="Carrot" [disabled]="true">Carrot</div>
            <div scSelectItem value="courgette" label="Courgette">Courgette</div>
            <div scSelectItem value="leek" label="Leek">Leek</div>
          </div>
        </div>
      </sc-select>
    </section>
  `,
})
export class SelectDemo {
  readonly listbox = viewChild(Listbox);
  readonly displayValue = computed(() => {
    const values = this.listbox()?.values() ?? [];
    return values.length ? values[0] : '';
  });
}
