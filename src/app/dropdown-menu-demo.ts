import { ChangeDetectionStrategy, Component } from '@angular/core';
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

      <div class="relative inline-block">
        <button
          scDropdownMenuTrigger
          [menu]="menu"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open Menu
        </button>

        <div scDropdownMenuContent #menu="ngMenu" (onSelect)="onSelect($event)">
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
      </div>
    </section>
  `,
})
export class DropdownMenuDemo {
  onSelect(value: string) {
    console.log('Selected:', value);
  }
}
