import { ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { MenuBar } from '@angular/aria/menu';
import { cn } from '../../utils';

@Component({
  selector: '[scMenubar]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: MenuBar,
      inputs: ['disabled'],
      outputs: ['onSelect'],
    },
  ],
  host: {
    'data-slot': 'menubar',
    '[class]': 'class()',
    '(focusin)': 'onFocusIn()',
  },
  template: `<ng-content />`,
})
export class ScMenubar {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly rendered = signal(false);

  readonly class = computed(() =>
    cn(
      'bg-background flex h-8 items-center gap-0.5 rounded-lg border p-[3px]',
      this.classInput(),
    ),
  );

  onFocusIn() {
    this.rendered.set(true);
  }
}
