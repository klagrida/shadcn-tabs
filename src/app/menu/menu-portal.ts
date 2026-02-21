import { Directive, effect, inject, input } from '@angular/core';
import { CdkConnectedOverlay, type ConnectedPosition } from '@angular/cdk/overlay';

const DEFAULT_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
];

@Directive({
  selector: '[scMenuPortal]',
  hostDirectives: [
    {
      directive: CdkConnectedOverlay,
      inputs: ['cdkConnectedOverlayOpen: open'],
    },
  ],
})
export class ScMenuPortal {
  readonly origin = input.required<Element>({ alias: 'scMenuPortal' });
  readonly positions = input<ConnectedPosition[]>(DEFAULT_POSITIONS);

  private readonly overlay = inject(CdkConnectedOverlay);

  constructor() {
    effect(() => {
      this.overlay._config = {
        origin: this.origin(),
        usePopover: 'inline',
        positions: this.positions(),
      };
    });
  }
}
