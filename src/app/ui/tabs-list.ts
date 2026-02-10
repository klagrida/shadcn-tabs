import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TabList } from '@angular/aria/tabs';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils';

export const tabsListVariants = cva(
  'rounded-lg p-[3px] group-data-horizontal:h-8 data-[variant=line]:rounded-none text-muted-foreground inline-flex w-fit items-center justify-center group-data-vertical:h-fit group-data-vertical:flex-col',
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

type TabsListVariant = VariantProps<typeof tabsListVariants>['variant'];

@Component({
  selector: '[scTabsList]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: TabList,
      inputs: ['selectedTab', 'selectionMode', 'orientation', 'disabled', 'wrap', 'focusMode'],
      outputs: ['selectedTabChange'],
    },
  ],
  host: {
    '[class]': 'computedClass()',
    '[attr.data-variant]': 'variant()',
  },
  template: `<ng-content />`,
})
export class ScTabsList {
  readonly class = input<string>('');
  readonly variant = input<TabsListVariant>('default');
  readonly computedClass = computed(() => cn(tabsListVariants({ variant: this.variant() }), this.class()));
}
