import { ChangeDetectionStrategy, Component, computed, contentChild, input, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkConnectedOverlay, type ConnectedPosition } from '@angular/cdk/overlay';
import { MenuTrigger } from '@angular/aria/menu';
import { ScDropdownMenuPortal } from './dropdown-menu-portal';

@Component({
  selector: 'sc-dropdown-menu-provider',
  imports: [CdkConnectedOverlay, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'dropdown-menu',
    style: 'display: contents',
  },
  template: `
    <ng-content />
    @if (origin(); as origin) {
      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOpen]="open()"
        [cdkConnectedOverlayOrigin]="origin"
        [cdkConnectedOverlayPositions]="positions()"
        [cdkConnectedOverlayOffsetY]="offsetY()"
      >
        <ng-container [ngTemplateOutlet]="portalTemplate()" />
      </ng-template>
    }
  `,
})
export class ScDropdownMenuProvider {
  private readonly trigger = contentChild(MenuTrigger);
  private readonly portal = contentChild(ScDropdownMenuPortal);

  readonly positions = input<ConnectedPosition[]>([
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ]);
  readonly offsetY = input(4);

  protected readonly open = computed(() => this.trigger()?.expanded() ?? false);
  protected readonly origin = computed(() => this.trigger()?.element);
  protected readonly portalTemplate = computed(() => this.portal()?.templateRef ?? null);
}
