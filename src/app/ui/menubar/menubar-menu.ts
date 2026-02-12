import { ChangeDetectionStrategy, Component, computed, contentChild, inject, input, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkConnectedOverlay, type ConnectedPosition } from '@angular/cdk/overlay';
import { ScMenubar } from './menubar';
import { ScMenubarTrigger } from './menubar-trigger';
import { ScMenubarPortal } from './menubar-portal';

@Component({
  selector: 'sc-menubar-menu',
  imports: [CdkConnectedOverlay, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'menubar-menu',
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
export class ScMenubarMenu {
  private readonly menubar = inject(ScMenubar);
  private readonly trigger = contentChild(ScMenubarTrigger);
  private readonly portal = contentChild(ScMenubarPortal);

  readonly positions = input<ConnectedPosition[]>([
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ]);
  readonly offsetY = input(4);

  protected readonly open = computed(() => this.menubar.rendered());
  protected readonly origin = computed(() => this.trigger()?.element);
  protected readonly portalTemplate = computed(() => this.portal()?.templateRef ?? null);
}
