import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkConnectedOverlay, type ConnectedPosition } from '@angular/cdk/overlay';
import { Menu } from '@angular/aria/menu';
import { ScMenubarSubTrigger } from './menubar-sub-trigger';
import { ScMenubarPortal } from './menubar-portal';

@Component({
  selector: 'sc-menubar-sub',
  imports: [CdkConnectedOverlay, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'menubar-sub',
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
        [cdkConnectedOverlayOffsetX]="offsetX()"
      >
        <ng-container [ngTemplateOutlet]="portalTemplate()" />
      </ng-template>
    }
  `,
})
export class ScMenubarSub {
  private readonly parentMenu = inject(Menu);
  private readonly trigger = contentChild(ScMenubarSubTrigger);
  private readonly portal = contentChild(ScMenubarPortal);

  readonly positions = input<ConnectedPosition[]>([
    { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
  ]);
  readonly offsetX = input(4);

  protected readonly open = computed(() => this.parentMenu.visible());
  protected readonly origin = computed(() => this.trigger()?.element);
  protected readonly portalTemplate = computed(() => this.portal()?.templateRef ?? null);
}
