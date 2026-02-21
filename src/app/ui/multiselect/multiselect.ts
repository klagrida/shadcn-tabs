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
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { Combobox, ComboboxPopupContainer } from '@angular/aria/combobox';
import { cn } from '../../utils';
import { ScMultiselectPortal } from './multiselect-portal';

@Component({
  selector: '[scMultiselect]',
  exportAs: 'scMultiselect',
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
    'data-slot': 'multiselect',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselect<V = string> {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly combobox = inject<Combobox<V>>(Combobox);
  readonly expanded = this.combobox.expanded;

  protected readonly portal = contentChild(ScMultiselectPortal);
  protected readonly overlayOrigin = contentChild(CdkOverlayOrigin);

  protected readonly class = computed(() =>
    cn('', this.classInput()),
  );
}
