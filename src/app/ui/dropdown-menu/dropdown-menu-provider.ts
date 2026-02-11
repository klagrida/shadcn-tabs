import { ChangeDetectionStrategy, Component, computed, contentChild, input, ViewEncapsulation } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { CdkConnectedOverlay, type ConnectedPosition } from '@angular/cdk/overlay';
import { MenuTrigger } from '@angular/aria/menu';
import { ScDropdownMenuPopover } from './dropdown-menu-popover';

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
        <ng-container [ngTemplateOutlet]="popoverTemplate()" />
      </ng-template>
    }
  `,
})
export class ScDropdownMenuProvider {
  private readonly trigger = contentChild(MenuTrigger);
  private readonly popover = contentChild(ScDropdownMenuPopover);

  readonly positions = input<ConnectedPosition[]>([
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ]);
  readonly offsetY = input(4);

  protected readonly open = computed(() => this.trigger()?.expanded() ?? false);
  protected readonly origin = computed(() => this.trigger()?.element);
  protected readonly popoverTemplate = computed(() => this.popover()?.templateRef ?? null);
}
