import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { TabList } from '@angular/aria/tabs';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils';

export const tabsListVariants = cva(
  'rounded-lg p-[3px] group-data-[orientation=horizontal]:h-8 data-[variant=line]:rounded-none text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]:h-fit group-data-[orientation=vertical]:flex-col',
  {
    variants: {
      variant: {
        default: 'bg-muted',
        line: 'gap-1 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type ScTabListVariant = VariantProps<typeof tabsListVariants>['variant'];

@Component({
  selector: '[scTabList]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: TabList,
      inputs: ['selectedTab', 'selectionMode', 'orientation', 'disabled', 'wrap', 'focusMode'],
      outputs: ['selectedTabChange'],
    },
  ],
  host: {
    'data-slot': 'tabs-list',
    '[class]': 'class()',
    '[attr.data-variant]': 'variant()',
  },
  template: `<ng-content />`,
})
export class ScTabList {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScTabListVariant>('default');
  readonly class = computed(() => cn(tabsListVariants({ variant: this.variant() }), this.classInput()));
}
