import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { ComboboxInput } from '@angular/aria/combobox';
import { cn } from '../../utils';

@Component({
  selector: '[scComboboxInput]',
  exportAs: 'scComboboxInput',
  imports: [ComboboxInput],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4 shrink-0 opacity-50 absolute left-2.5 pointer-events-none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input
      ngComboboxInput
      [placeholder]="placeholder()"
      [(value)]="value"
      class="w-full rounded-t-lg border-none bg-transparent py-2 pl-9 pr-3 text-sm outline-none"
    />
  `,
  host: {
    'data-slot': 'combobox-input',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxInput {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly placeholder = input('Search...');
  readonly value = model('');

  protected readonly class = computed(() =>
    cn('flex relative items-center border-b border-input', this.classInput()),
  );
}
