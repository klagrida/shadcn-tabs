import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { cn } from '../../utils';
import { ScComboboxPortal } from './combobox-portal';

@Component({
  selector: '[scCombobox]',
  exportAs: 'scCombobox',
  imports: [OverlayModule, NgTemplateOutlet, ComboboxPopupContainer],
  hostDirectives: [
    {
      directive: Combobox,
      inputs: ['filterMode', 'disabled', 'readonly', 'alwaysExpanded'],
    },
  ],
  template: `
    <ng-content />

    @if (portal(); as p) {
      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{ origin: overlayOrigin(), usePopover: 'inline', matchWidth: true }"
          [cdkConnectedOverlayOpen]="true"
        >
          <ng-container [ngTemplateOutlet]="p.templateRef" />
        </ng-template>
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
  readonly value = model<V[]>([]);
  readonly combobox = inject<Combobox<V>>(Combobox);
  readonly expanded = this.combobox.expanded;

  protected readonly portal = contentChild(ScComboboxPortal);
  protected readonly overlayOrigin = contentChild(CdkOverlayOrigin);

  protected readonly class = computed(() =>
    cn('relative flex flex-col', this.classInput()),
  );
}
