import { ChangeDetectionStrategy, Component, computed, Directive, input } from '@angular/core';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '../utils';

const tabsListVariants = cva(
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
  selector: '[shTabs]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: Tabs,
    },
  ],
  host: {
    '[class]': 'computedClass()',
    '[attr.data-orientation]': 'orientation()',
  },
  template: `<ng-content />`,
})
export class ShTabs {
  readonly class = input<string>('');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly computedClass = computed(() =>
    cn('gap-2 flex', this.orientation() === 'horizontal' ? 'flex-col' : 'flex-row', this.class()),
  );
}

@Component({
  selector: '[shTabsList]',
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
export class ShTabsList {
  readonly class = input<string>('');
  readonly variant = input<TabsListVariant>('default');
  readonly computedClass = computed(() => cn(tabsListVariants({ variant: this.variant() }), this.class()));
}

@Directive({
  selector: '[shTab]',
  hostDirectives: [
    {
      directive: Tab,
      inputs: ['value', 'disabled', 'id'],
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
})
export class ShTab {
  readonly class = input<string>('');
  readonly computedClass = computed(() =>
    cn(
      "gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-sm font-medium",
      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring",
      "text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground",
      "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap transition-all",
      "group-data-vertical:w-full group-data-vertical:justify-start",
      "focus-visible:ring-[3px] focus-visible:outline-1",
      "disabled:pointer-events-none disabled:opacity-50",
      "[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      // default variant active styles
      "aria-selected:bg-background aria-selected:shadow-sm aria-selected:text-foreground",
      "dark:aria-selected:text-foreground dark:aria-selected:border-input dark:aria-selected:bg-input/30",
      // line variant styles (applied when parent has data-variant=line)
      "group-data-[variant=line]:bg-transparent group-data-[variant=line]:aria-selected:bg-transparent group-data-[variant=line]:aria-selected:shadow-none",
      "dark:group-data-[variant=line]:aria-selected:border-transparent dark:group-data-[variant=line]:aria-selected:bg-transparent",
      // line variant underline/side indicator
      "after:bg-foreground after:absolute after:opacity-0 after:transition-opacity",
      "group-data-horizontal:after:inset-x-0 group-data-horizontal:after:bottom-[-5px] group-data-horizontal:after:h-0.5",
      "group-data-vertical:after:inset-y-0 group-data-vertical:after:-right-1 group-data-vertical:after:w-0.5",
      "group-data-[variant=line]:aria-selected:after:opacity-100",
      this.class(),
    ),
  );
}

@Component({
  selector: '[shTabPanel]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: TabPanel,
      inputs: ['value', 'id'],
    },
  ],
  host: {
    '[class]': 'computedClass()',
  },
  template: `<ng-content />`,
})
export class ShTabPanel {
  readonly class = input<string>('');
  readonly computedClass = computed(() => cn('text-sm flex-1 outline-none', this.class()));
}

@Directive({
  selector: 'ng-template[shTabContent]',
  hostDirectives: [TabContent],
})
export class ShTabContent {}

export { tabsListVariants };
