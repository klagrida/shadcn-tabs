import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Menu } from '@angular/aria/menu';
import {
  ScDropdownMenuProvider,
  ScDropdownMenuTrigger,
  ScDropdownMenuPortal,
  ScDropdownMenu,
  ScDropdownMenuContent,
  ScDropdownMenuItem,
  ScDropdownMenuGroup,
  ScDropdownMenuLabel,
  ScDropdownMenuSeparator,
  ScDropdownMenuShortcut,
  ScDropdownMenuSubProvider,
  ScDropdownMenuSubTrigger,
  ScDropdownMenuSub,
} from './ui';

@Component({
  selector: 'dropdown-menu-demo',
  imports: [
    ScDropdownMenuProvider,
    ScDropdownMenuTrigger,
    ScDropdownMenuPortal,
    ScDropdownMenu,
    ScDropdownMenuContent,
    ScDropdownMenuItem,
    ScDropdownMenuGroup,
    ScDropdownMenuLabel,
    ScDropdownMenuSeparator,
    ScDropdownMenuShortcut,
    ScDropdownMenuSubProvider,
    ScDropdownMenuSubTrigger,
    ScDropdownMenuSub,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h2 class="text-lg font-semibold mb-4">Dropdown Menu</h2>

      <sc-dropdown-menu-provider>
        <button
          scDropdownMenuTrigger
          [menu]="menu()"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open Menu
        </button>

        <ng-template scDropdownMenuPortal>
          <div scDropdownMenu #menuRef="ngMenu" (onSelect)="onSelect($event)">
            <ng-template scDropdownMenuContent>
              <div scDropdownMenuLabel>My Account</div>
              <div scDropdownMenuSeparator></div>
              <div scDropdownMenuGroup>
                <div scDropdownMenuItem value="profile">
                  Profile
                  <span scDropdownMenuShortcut>⇧⌘P</span>
                </div>
                <div scDropdownMenuItem value="billing">
                  Billing
                  <span scDropdownMenuShortcut>⌘B</span>
                </div>
                <div scDropdownMenuItem value="settings">
                  Settings
                  <span scDropdownMenuShortcut>⌘S</span>
                </div>
              </div>
              <div scDropdownMenuSeparator></div>

              <sc-dropdown-menu-sub-provider>
                <div scDropdownMenuSubTrigger value="share" [submenu]="subMenu()">
                  Share
                  <svg class="ml-auto size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </div>

                <ng-template scDropdownMenuPortal>
                  <div scDropdownMenuSub #subMenuRef="ngMenu">
                    <ng-template scDropdownMenuContent>
                      <div scDropdownMenuItem value="email">Email</div>
                      <div scDropdownMenuItem value="message">Message</div>
                      <div scDropdownMenuItem value="link">Copy Link</div>
                    </ng-template>
                  </div>
                </ng-template>
              </sc-dropdown-menu-sub-provider>

              <div scDropdownMenuSeparator></div>
              <div scDropdownMenuItem value="logout" variant="destructive">
                Log out
                <span scDropdownMenuShortcut>⇧⌘Q</span>
              </div>
            </ng-template>
          </div>
        </ng-template>
      </sc-dropdown-menu-provider>
    </section>
  `,
})
export class DropdownMenuDemo {
  readonly menu = viewChild(Menu);
  readonly subMenu = viewChild('subMenuRef', { read: Menu });

  onSelect(value: string) {
    console.log('Selected:', value);
  }
}
