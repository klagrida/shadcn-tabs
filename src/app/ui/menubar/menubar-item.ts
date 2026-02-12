import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@angular/aria/menu';
import { cn } from '../../utils';

export const menubarItemBaseStyles = [
  'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
  'focus:bg-accent focus:text-accent-foreground',
  'data-[variant=destructive]:text-destructive data-[variant=destructive]:data-[active=true]:bg-destructive/10 dark:data-[variant=destructive]:data-[active=true]:bg-destructive/20 data-[variant=destructive]:data-[active=true]:text-destructive data-[variant=destructive]:*:[svg]:text-destructive',
  'not-data-[variant=destructive]:data-[active=true]:**:text-accent-foreground',
  'gap-1.5 rounded-md px-1.5 py-1 text-sm data-inset:pl-7',
  '[&_svg:not([class*=size-])]:size-4',
  'group/menubar-item relative flex cursor-default items-center outline-hidden select-none',
  'data-disabled:pointer-events-none data-disabled:opacity-50',
  '[&_svg]:pointer-events-none [&_svg]:shrink-0',
] as const;

@Component({
  selector: '[scMenubarItem]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  hostDirectives: [
    {
      directive: MenuItem,
      inputs: ['value', 'disabled', 'id', 'submenu'],
    },
  ],
  host: {
    'data-slot': 'menubar-item',
    '[attr.data-inset]': 'inset()',
    '[attr.data-variant]': 'variant()',
    '[class]': 'class()',
  },
  template: `<ng-content />`,
})
export class ScMenubarItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input(false);
  readonly variant = input<'default' | 'destructive'>('default');

  readonly class = computed(() =>
    cn(...menubarItemBaseStyles, this.classInput()),
  );
}
