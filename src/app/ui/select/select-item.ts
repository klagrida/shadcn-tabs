import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { Option } from '@angular/aria/listbox';
import { cn } from '../../utils';

@Component({
  selector: '[scSelectItem]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: Option,
      inputs: ['value', 'disabled', 'label', 'id'],
    },
  ],
  host: {
    'data-slot': 'select-item',
    '[class]': 'class()',
  },
  template: `
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      @if (option.selected()) {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      }
    </span>
    <ng-content />
  `,
})
export class ScSelectItem {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly option = inject(Option);

  readonly class = computed(() =>
    cn(
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      'gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm',
      '[&_svg:not([class*=size-])]:size-4',
      'relative flex w-full cursor-default items-center outline-hidden select-none',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      this.classInput(),
    ),
  );
}
