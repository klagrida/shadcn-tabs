import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { cn } from '../../utils';
import { ScComboboxPortal } from './combobox-portal';

@Component({
  selector: '[scCombobox]',
  exportAs: 'scCombobox',
  imports: [ComboboxPopupContainer, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['disabled', 'readonly'],
    },
  ],
  template: `
    <ng-content />

    @if (portal(); as p) {
      <ng-template ngComboboxPopupContainer>
        <ng-container [ngTemplateOutlet]="p.templateRef" />
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'combobox',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCombobox<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly combobox = inject<Combobox<V>>(Combobox);
  readonly expanded = this.combobox.expanded;

  protected readonly portal = contentChild(ScComboboxPortal);

  protected readonly class = computed(() =>
    cn('relative flex flex-col border border-input rounded-lg', this.classInput()),
  );
}
