import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { Menu } from '@angular/aria/menu';
import {
  ScDropdownMenuTrigger,
  ScDropdownMenuContent,
  ScDropdownMenuContentTemplate,
  ScDropdownMenuItem,
  ScDropdownMenuGroup,
  ScDropdownMenuLabel,
  ScDropdownMenuSeparator,
  ScDropdownMenuShortcut,
} from './ui';

@Component({
  selector: 'dropdown-menu-demo',
  imports: [
    CdkConnectedOverlay,
    ScDropdownMenuTrigger,
    ScDropdownMenuContent,
    ScDropdownMenuContentTemplate,
    ScDropdownMenuItem,
    ScDropdownMenuGroup,
    ScDropdownMenuLabel,
    ScDropdownMenuSeparator,
    ScDropdownMenuShortcut,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h2 class="text-lg font-semibold mb-4">Dropdown Menu</h2>

      <button
        scDropdownMenuTrigger
        [menu]="menu()"
        #trigger="ngMenuTrigger"
        class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        Open Menu
      </button>

      <ng-template
        cdkConnectedOverlay
        [cdkConnectedOverlayOpen]="trigger.expanded()"
        [cdkConnectedOverlayOrigin]="trigger.element"
        [cdkConnectedOverlayPositions]="positions"
        [cdkConnectedOverlayOffsetY]="4"
      >
        <div scDropdownMenuContent #menuRef="ngMenu" (onSelect)="onSelect($event)">
          <ng-template scDropdownMenuContentTemplate>
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
            <div scDropdownMenuGroup>
              <div scDropdownMenuItem value="team">Team</div>
              <div scDropdownMenuItem value="invite">Invite users</div>
            </div>
            <div scDropdownMenuSeparator></div>
            <div scDropdownMenuItem value="logout" variant="destructive">
              Log out
              <span scDropdownMenuShortcut>⇧⌘Q</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </section>
  `,
})
export class DropdownMenuDemo {
  readonly menu = viewChild(Menu);

  readonly positions: ConnectedPosition[] = [
    { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
  ];

  onSelect(value: string) {
    console.log('Selected:', value);
  }
}
