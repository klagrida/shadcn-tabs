import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComboboxInput } from '@angular/aria/combobox';
import { cn } from '../../utils';
import { ScCombobox } from './combobox';

@Component({
  selector: '[scComboboxTrigger]',
  exportAs: 'scComboboxTrigger',
  imports: [ComboboxInput],
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <input
      ngComboboxInput
      [attr.aria-label]="ariaLabel()"
      [placeholder]="placeholder()"
      [value]="combobox.value().join(', ')"
      class="w-full cursor-pointer rounded-lg border-none bg-transparent px-3 py-2 text-sm outline-none"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="text-muted-foreground size-4 shrink-0 opacity-50 absolute right-2.5 pointer-events-none transition-transform duration-150"
      [class.rotate-180]="combobox.expanded()"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  host: {
    'data-slot': 'combobox-trigger',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComboboxTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });
  readonly placeholder = input<string>('');
  readonly combobox = inject(ScCombobox);

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 dark:hover:bg-input/50 flex relative items-center rounded-lg border bg-transparent transition-colors hover:bg-accent/50',
      this.classInput(),
    ),
  );
}
