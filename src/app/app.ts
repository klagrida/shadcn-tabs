import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShTab, ShTabContent, ShTabPanel, ShTabs, ShTabsList } from './ui/tabs';

@Component({
  selector: 'app-root',
  imports: [ShTabs, ShTabsList, ShTab, ShTabPanel, ShTabContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-8 space-y-8">
      <section>
        <h2 class="text-lg font-semibold mb-4">Default Tabs</h2>
        <div shTabs>
          <div shTabsList selectedTab="account" selectionMode="follow">
            <button shTab value="account">Account</button>
            <button shTab value="password">Password</button>
            <button shTab value="settings">Settings</button>
          </div>
          <div shTabPanel value="account">
            <ng-template shTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Account</h3>
                <p class="text-muted-foreground mt-1">Make changes to your account here.</p>
              </div>
            </ng-template>
          </div>
          <div shTabPanel value="password">
            <ng-template shTabContent>
              <div class="p-4 border rounded-lg">
                <h3 class="font-medium">Password</h3>
                <p class="text-muted-foreground mt-1">Change your password here.</p>
              </div>
            </ng-template>
          </div>
          <div shTabPanel value="settings">
            <ng-template shTabContent>
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
        <div shTabs>
          <div shTabsList variant="line" selectedTab="overview" selectionMode="follow">
            <button shTab value="overview">Overview</button>
            <button shTab value="analytics">Analytics</button>
            <button shTab value="reports">Reports</button>
            <button shTab value="notifications" disabled>Notifications</button>
          </div>
          <div shTabPanel value="overview">
            <ng-template shTabContent>
              <div class="p-4">
                <h3 class="font-medium">Overview</h3>
                <p class="text-muted-foreground mt-1">Your project overview and summary.</p>
              </div>
            </ng-template>
          </div>
          <div shTabPanel value="analytics">
            <ng-template shTabContent>
              <div class="p-4">
                <h3 class="font-medium">Analytics</h3>
                <p class="text-muted-foreground mt-1">View your analytics data.</p>
              </div>
            </ng-template>
          </div>
          <div shTabPanel value="reports">
            <ng-template shTabContent>
              <div class="p-4">
                <h3 class="font-medium">Reports</h3>
                <p class="text-muted-foreground mt-1">Generate and view reports.</p>
              </div>
            </ng-template>
          </div>
          <div shTabPanel value="notifications">
            <ng-template shTabContent>
              <div class="p-4">
                <h3 class="font-medium">Notifications</h3>
                <p class="text-muted-foreground mt-1">Configure your notifications.</p>
              </div>
            </ng-template>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class App {}
