import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuSubmenuPortal,
  ScMenuTrigger,
} from './menu';

@Component({
  selector: 'dropdown-menu-demo',
  imports: [
    OverlayModule,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuSubmenuPortal,
    ScMenuTrigger,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center font-sans',
  },
  template: `
    <div scMenuProvider>
      <button scMenuTrigger>
        Open Menu
      </button>
      <ng-template scMenuPortal>
        <div scMenu #formatMenu="scMenu">
          <ng-template scMenuContent>
            <div scMenuItem value="Mark as read">
              <svg
                class="size-4 opacity-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                <path d="m16 19 2 2 4-4" />
              </svg>
              <span class="flex-1 text-sm opacity-90">Mark as read</span>
            </div>
            <div scMenuItem value="Snooze">
              <svg
                class="size-4 opacity-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span class="flex-1 text-sm opacity-90">Snooze</span>
            </div>
            <div scMenuSeparator></div>
            <div
              scMenuItem
              value="Categorize"
              #categorizeItem="scMenuItem"
              [submenu]="categorizeMenu()?.menu"
            >
              <svg
                class="size-4 opacity-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              <span class="flex-1 text-sm opacity-90">Categorize</span>
              <svg
                class="ml-auto size-4 opacity-50"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>

              <ng-template
                scMenuSubmenuPortal
                [open]="formatMenu.visible()"
                [config]="{ origin: categorizeItem.overlayOrigin, usePopover: 'inline' }"
                [positions]="[
                  {
                    originX: 'end',
                    originY: 'top',
                    overlayY: 'top',
                    overlayX: 'start',
                    offsetX: 6,
                  },
                ]"
              >
                <div scMenu #categorizeMenu="scMenu">
                  <ng-template scMenuContent>
                    <div scMenuItem value="Mark as important">
                      <svg
                        class="size-4 opacity-75"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M6 3h12l4 6-10 13L2 9Z" />
                        <path d="M11 3 8 9l4 13 4-13-3-6" />
                        <path d="M2 9h20" />
                      </svg>
                      <span class="flex-1 text-sm opacity-90">Mark as important</span>
                    </div>
                    <div scMenuItem value="Star">
                      <svg
                        class="size-4 opacity-75"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polygon
                          points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                        />
                      </svg>
                      <span class="flex-1 text-sm opacity-90">Star</span>
                    </div>
                    <div scMenuItem value="Label">
                      <svg
                        class="size-4 opacity-75"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"
                        />
                        <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                      <span class="flex-1 text-sm opacity-90">Label</span>
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>

            <div scMenuSeparator></div>
            <div scMenuItem value="Archive">
              <svg
                class="size-4 opacity-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect width="20" height="5" x="2" y="3" rx="1" />
                <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
                <path d="M10 12h4" />
              </svg>
              <span class="flex-1 text-sm opacity-90">Archive</span>
            </div>
            <div scMenuItem value="Report spam">
              <svg
                class="size-4 opacity-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
                />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
              <span class="flex-1 text-sm opacity-90">Report spam</span>
            </div>
            <div scMenuItem value="Delete">
              <svg
                class="size-4 opacity-75"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
              <span class="flex-1 text-sm opacity-90">Delete</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
})
export class DropdownMenuDemo {
  formatMenu = viewChild<ScMenu<string>>('formatMenu');
  categorizeMenu = viewChild<ScMenu<string>>('categorizeMenu');
}
