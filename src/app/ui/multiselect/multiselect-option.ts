import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { Option } from '@angular/aria/listbox';
import { cn } from '../../utils';

@Component({
  selector: '[scMultiselectOption]',
  exportAs: 'scMultiselectOption',
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'label', 'disabled'],
    },
  ],
  template: `
    <ng-content />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="size-4 shrink-0 opacity-0 group-aria-selected:opacity-100"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  `,
  host: {
    'data-slot': 'multiselect-option',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMultiselectOption {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:bg-primary/5 aria-selected:text-primary flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-hidden select-none hover:bg-accent/50',
      this.classInput(),
    ),
  );
}
