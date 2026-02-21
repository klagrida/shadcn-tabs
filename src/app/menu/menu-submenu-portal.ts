import { Directive } from '@angular/core';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';

@Directive({
  selector: '[scMenuSubmenuPortal]',
  hostDirectives: [
    {
      directive: CdkConnectedOverlay,
      inputs: [
        'cdkConnectedOverlayOpen: open',
        'cdkConnectedOverlay: config',
        'cdkConnectedOverlayPositions: positions',
      ],
    },
  ],
})
export class ScMenuSubmenuPortal {}
