import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import {
  CdkOverlayOrigin,
  type CdkConnectedOverlayConfig,
  type ConnectedPosition,
  OverlayModule,
} from '@angular/cdk/overlay';
import { MenuItem } from '@angular/aria/menu';
import { ScMenuSubmenuPortal } from './menu-submenu-portal';

@Component({
  selector: '[scMenuItem]',
  exportAs: 'scMenuItem',
  imports: [OverlayModule, NgTemplateOutlet],
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['id', 'value', 'disabled', 'searchTerm', 'submenu'],
      outputs: ['searchTermChange'],
    },
    CdkOverlayOrigin,
  ],
  template: `
    <ng-content />

    @if (submenuPortal(); as portal) {
      <ng-template
        [cdkConnectedOverlayOpen]="submenuOpen()"
        [cdkConnectedOverlay]="submenuConfig()"
        [cdkConnectedOverlayPositions]="submenuPositions()"
        cdkAttachPopoverAsChild
      >
        <ng-container [ngTemplateOutlet]="portal.templateRef" />
      </ng-template>
    }
  `,
  host: {
    class:
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuItem {
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly submenuOpen = input(false);
  readonly submenuConfig = input<CdkConnectedOverlayConfig>({});
  readonly submenuPositions = input<ConnectedPosition[]>([]);
  protected readonly submenuPortal = contentChild(ScMenuSubmenuPortal);
}
