import { ChangeDetectionStrategy, Component, computed, contentChild, input, ViewEncapsulation } from '@angular/core';
import { Combobox } from '@angular/aria/combobox';
import { Listbox } from '@angular/aria/listbox';
import { cn } from '../../utils';

@Component({
  selector: 'sc-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['readonly', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'select',
    readonly: '',
    '[class]': 'class()',
  },
  template: `<ng-content />`,
})
export class ScSelect {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly _listbox = contentChild(Listbox);
  readonly values = computed(() => this._listbox()?.values() ?? []);

  readonly class = computed(() =>
    cn('relative inline-block', this.classInput()),
  );
}
