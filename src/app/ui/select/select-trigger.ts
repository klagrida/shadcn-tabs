import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ComboboxInput } from '@angular/aria/combobox';
import { cn } from '../../utils';

@Component({
  selector: 'sc-select-trigger',
  imports: [ComboboxInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'data-slot': 'select-trigger',
    '[attr.data-size]': 'size()',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
    <input ngComboboxInput class="sr-only" [attr.aria-label]="ariaLabel()" />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="text-muted-foreground size-4 shrink-0 opacity-50"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6"/>
    </svg>
  `,
})
export class ScSelectTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly size = input<'default' | 'sm'>('default');
  readonly ariaLabel = input('');

  readonly class = computed(() =>
    cn(
      'border-input data-[placeholder]:text-muted-foreground',
      'dark:bg-input/30 dark:hover:bg-input/50',
      'focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-3',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      'flex w-fit cursor-pointer items-center justify-between gap-1.5 whitespace-nowrap',
      'rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm transition-colors select-none outline-none',
      'data-[size=default]:h-8 data-[size=sm]:h-7',
      'disabled:cursor-not-allowed disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
