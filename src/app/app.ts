import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScTab, ScTabContent, ScTabPanel, ScTabs, ScTabList } from './ui';

@Component({
  selector: 'app-root',
  imports: [ScTabs, ScTabList, ScTab, ScTabPanel, ScTabContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 space-y-8">
      <section>
        <h2 class="text-lg font-semibold mb-4">Default Tabs</h2>
        <div scTabs>
          <div scTabList selectedTab="account" selectionMode="follow">
            <button scTab value="account">Account</button>
            <button scTab value="password">Password</button>
            <button scTab value="settings">Settings</button>
          </div>
          <div scTabPanel value="account">
            <ng-template scTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Account</h3>
                <p class="text-muted-foreground mt-1">Make changes to your account here.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="password">
            <ng-template scTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Password</h3>
                <p class="text-muted-foreground mt-1">Change your password here.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="settings">
            <ng-template scTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Settings</h3>
                <p class="text-muted-foreground mt-1">Manage your settings here.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4">Line Variant</h2>
        <div scTabs>
          <div scTabList variant="line" selectedTab="overview" selectionMode="follow">
            <button scTab value="overview">Overview</button>
            <button scTab value="analytics">Analytics</button>
            <button scTab value="reports">Reports</button>
            <button scTab value="notifications" disabled>Notifications</button>
          </div>
          <div scTabPanel value="overview">
            <ng-template scTabContent>
              <div class="p-4">
                <h3 class="font-medium">Overview</h3>
                <p class="text-muted-foreground mt-1">Your project overview and summary.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="analytics">
            <ng-template scTabContent>
              <div class="p-4">
                <h3 class="font-medium">Analytics</h3>
                <p class="text-muted-foreground mt-1">View your analytics data.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="reports">
            <ng-template scTabContent>
              <div class="p-4">
                <h3 class="font-medium">Reports</h3>
                <p class="text-muted-foreground mt-1">Generate and view reports.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="notifications">
            <ng-template scTabContent>
              <div class="p-4">
                <h3 class="font-medium">Notifications</h3>
                <p class="text-muted-foreground mt-1">Configure your notifications.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4">Vertical Tabs</h2>
        <div scTabs orientation="vertical">
          <div scTabList selectedTab="profile" selectionMode="follow" orientation="vertical">
            <button scTab value="profile">Profile</button>
            <button scTab value="emails">Emails</button>
            <button scTab value="security">Security</button>
          </div>
          <div scTabPanel value="profile">
            <ng-template scTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Profile</h3>
                <p class="text-muted-foreground mt-1">Manage your public profile information.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="emails">
            <ng-template scTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Emails</h3>
                <p class="text-muted-foreground mt-1">Add or remove email addresses.</p>
              </div>
            </ng-template>
          </div>
          <div scTabPanel value="security">
            <ng-template scTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Security</h3>
                <p class="text-muted-foreground mt-1">Configure two-factor authentication.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class App {}
