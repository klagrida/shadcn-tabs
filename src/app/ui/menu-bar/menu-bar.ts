import { computed, Directive, input, signal } from '@angular/core';
import { MenuBar } from '@angular/aria/menu';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenuBar]',
  hostDirectives: [MenuBar],
  host: {
    'data-slot': 'menu-bar',
    '[class]': 'class()',
    '(focusin)': 'onFocusIn()',
  },
})
export class ScMenuBar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex h-8 items-center gap-0.5 rounded-lg border bg-background p-[3px]', this.classInput()),
  );

  rendered = signal(false);
  onFocusIn() {
    this.rendered.set(true);
  }
}
