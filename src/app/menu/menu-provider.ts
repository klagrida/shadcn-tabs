import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: '[scMenuProvider]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
})
export class ScMenuProvider {}
