import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[sc-menu-provider]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class ScMenuProvider {}
