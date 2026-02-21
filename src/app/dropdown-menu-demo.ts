import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScMenuProvider } from './menu';

@Component({
  selector: 'dropdown-menu-demo',
  imports: [Menu, MenuContent, MenuItem, MenuTrigger, OverlayModule, ScMenuProvider],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center font-sans',
  },
  template: `
    <div sc-menu-provider>
      <button
        ngMenuTrigger
        #origin
        #trigger="ngMenuTrigger"
        [menu]="formatMenu()"
        class="inline-flex cursor-pointer items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring"
      >
        Open Menu
      </button>
      <ng-template
        [cdkConnectedOverlayOpen]="trigger.expanded()"
        [cdkConnectedOverlay]="{ origin, usePopover: 'inline' }"
        [cdkConnectedOverlayPositions]="[
          { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        ]"
        cdkAttachPopoverAsChild
      >
        <div
          ngMenu
          #formatMenu="ngMenu"
          class="bg-popover text-popover-foreground min-w-32 w-[15rem] rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden"
        >
          <ng-template ngMenuContent>
            <div
              ngMenuItem
              value="Mark as read"
              class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                >mark_email_read</span
              >
              <span class="flex-1 text-sm opacity-90">Mark as read</span>
            </div>
            <div
              ngMenuItem
              value="Snooze"
              class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                >snooze</span
              >
              <span class="flex-1 text-sm opacity-90">Snooze</span>
            </div>
            <div role="separator" aria-orientation="horizontal" class="bg-border -mx-1 my-1 h-px"></div>
            <div
              ngMenuItem
              value="Categorize"
              #categorizeItem
              [submenu]="categorizeMenu()"
              class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[expanded=true]:bg-accent data-[expanded=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                >category</span
              >
              <span class="flex-1 text-sm opacity-90">Categorize</span>
              <span class="ml-auto opacity-50 material-symbols-outlined" translate="no" aria-hidden="true"
                >arrow_right</span
              >

              <ng-template
                [cdkConnectedOverlayOpen]="formatMenu.visible()"
                [cdkConnectedOverlay]="{ origin: categorizeItem, usePopover: 'inline' }"
                [cdkConnectedOverlayPositions]="[
                  {
                    originX: 'end',
                    originY: 'top',
                    overlayY: 'top',
                    overlayX: 'start',
                    offsetX: 6,
                  },
                ]"
                cdkAttachPopoverAsChild
              >
                <div
                  ngMenu
                  #categorizeMenu="ngMenu"
                  class="bg-popover text-popover-foreground min-w-32 w-[15rem] rounded-lg p-1 shadow-md ring-1 ring-foreground/10 z-50 overflow-x-hidden overflow-y-auto data-[visible=false]:hidden"
                >
                  <ng-template ngMenuContent>
                    <div
                      ngMenuItem
                      value="Mark as important"
                      class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                        >label_important</span
                      >
                      <span class="flex-1 text-sm opacity-90">Mark as important</span>
                    </div>
                    <div
                      ngMenuItem
                      value="Star"
                      class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                        >star</span
                      >
                      <span class="flex-1 text-sm opacity-90">Star</span>
                    </div>
                    <div
                      ngMenuItem
                      value="Label"
                      class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
                    >
                      <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                        >label</span
                      >
                      <span class="flex-1 text-sm opacity-90">Label</span>
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>

            <div role="separator" aria-orientation="horizontal" class="bg-border -mx-1 my-1 h-px"></div>
            <div
              ngMenuItem
              value="Archive"
              class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                >archive</span
              >
              <span class="flex-1 text-sm opacity-90">Archive</span>
            </div>
            <div
              ngMenuItem
              value="Report spam"
              class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                >report</span
              >
              <span class="flex-1 text-sm opacity-90">Report spam</span>
            </div>
            <div
              ngMenuItem
              value="Delete"
              class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground gap-1.5 rounded-md px-1.5 py-1 text-sm relative flex cursor-default items-center outline-hidden select-none focus-visible:outline-2 focus-visible:outline-ring"
            >
              <span class="size-5 opacity-75 material-symbols-outlined" translate="no" aria-hidden="true"
                >delete</span
              >
              <span class="flex-1 text-sm opacity-90">Delete</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
})
export class DropdownMenuDemo {
  formatMenu = viewChild<Menu<string>>('formatMenu');
  categorizeMenu = viewChild<Menu<string>>('categorizeMenu');
}
