import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { ScSelect } from './select';

@Component({
  selector: 'sc-select-value',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'select-value',
    class: 'flex items-center gap-1.5 line-clamp-1',
  },
  template: `
    @if (hasValue()) {
      <ng-content />
    } @else {
      {{ placeholder() }}
    }
  `,
})
export class ScSelectValue {
  private readonly select = inject(ScSelect);
  readonly placeholder = input('');
  readonly hasValue = computed(() => (this.select.values()?.length ?? 0) > 0);
}
