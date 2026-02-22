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
import { ScMultiselect } from './multiselect';

@Component({
  selector: '[scMultiselectTrigger]',
  exportAs: 'scMultiselectTrigger',
  imports: [ComboboxInput],
  hostDirectives: [CdkOverlayOrigin],
  template: `
    <ng-content />
    <input
      ngComboboxInput
      [attr.aria-label]="ariaLabel()"
      [placeholder]="placeholder()"
      class="opacity-0 cursor-pointer px-14 h-8 border-none bg-transparent outline-none"
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
      [class.rotate-180]="multiselect.expanded()"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  `,
  host: {
    'data-slot': 'multiselect-trigger',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });
  readonly placeholder = input<string>('');
  readonly multiselect = inject(ScMultiselect);

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 dark:hover:bg-input/50 flex relative items-center rounded-lg border bg-transparent transition-colors hover:bg-accent/50 has-[[ngComboboxInput][aria-disabled=true]]:opacity-50 has-[[ngComboboxInput][aria-disabled=true]]:cursor-default',
      this.classInput(),
    ),
  );
}
