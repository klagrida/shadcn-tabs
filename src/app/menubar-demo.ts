import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Menu } from '@angular/aria/menu';
import {
  ScMenubar,
  ScMenubarMenu,
  ScMenubarTrigger,
  ScMenubarPortal,
  ScMenubarContent,
  ScMenubarContentDef,
  ScMenubarItem,
  ScMenubarSeparator,
  ScMenubarShortcut,
  ScMenubarSub,
  ScMenubarSubTrigger,
  ScMenubarSubContent,
} from './ui';

@Component({
  selector: 'menubar-demo',
  imports: [
    ScMenubar,
    ScMenubarMenu,
    ScMenubarTrigger,
    ScMenubarPortal,
    ScMenubarContent,
    ScMenubarContentDef,
    ScMenubarItem,
    ScMenubarSeparator,
    ScMenubarShortcut,
    ScMenubarSub,
    ScMenubarSubTrigger,
    ScMenubarSubContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <h2 class="text-lg font-semibold mb-4">Menubar</h2>

      <div scMenubar>
        <!-- File menu -->
        <sc-menubar-menu>
          <div scMenubarTrigger value="File" [submenu]="fileMenu()">
            File
          </div>

          <ng-template scMenubarPortal>
            <div scMenubarContent #fileMenuRef="ngMenu">
              <ng-template scMenubarContentDef>
                <div scMenubarItem value="new-tab">
                  New Tab
                  <span scMenubarShortcut>&#8984;T</span>
                </div>
                <div scMenubarItem value="new-window">
                  New Window
                  <span scMenubarShortcut>&#8984;N</span>
                </div>
                <div scMenubarItem value="new-incognito" [disabled]="true">
                  New Incognito Window
                </div>
                <div scMenubarSeparator></div>

                <sc-menubar-sub>
                  <div scMenubarSubTrigger value="share" [submenu]="shareMenu()">
                    Share
                    <svg class="ml-auto size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>

                  <ng-template scMenubarPortal>
                    <div scMenubarSubContent #shareMenuRef="ngMenu">
                      <ng-template scMenubarContentDef>
                        <div scMenubarItem value="email">Email Link</div>
                        <div scMenubarItem value="messages">Messages</div>
                        <div scMenubarItem value="notes">Notes</div>
                      </ng-template>
                    </div>
                  </ng-template>
                </sc-menubar-sub>

                <div scMenubarSeparator></div>
                <div scMenubarItem value="print">
                  Print...
                  <span scMenubarShortcut>&#8984;P</span>
                </div>
              </ng-template>
            </div>
          </ng-template>
        </sc-menubar-menu>

        <!-- Edit menu -->
        <sc-menubar-menu>
          <div scMenubarTrigger value="Edit" [submenu]="editMenu()">
            Edit
          </div>

          <ng-template scMenubarPortal>
            <div scMenubarContent #editMenuRef="ngMenu">
              <ng-template scMenubarContentDef>
                <div scMenubarItem value="undo">
                  Undo
                  <span scMenubarShortcut>&#8984;Z</span>
                </div>
                <div scMenubarItem value="redo">
                  Redo
                  <span scMenubarShortcut>&#8679;&#8984;Z</span>
                </div>
                <div scMenubarSeparator></div>

                <sc-menubar-sub>
                  <div scMenubarSubTrigger value="find" [submenu]="findMenu()">
                    Find
                    <svg class="ml-auto size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </div>

                  <ng-template scMenubarPortal>
                    <div scMenubarSubContent #findMenuRef="ngMenu">
                      <ng-template scMenubarContentDef>
                        <div scMenubarItem value="search-web">Search the Web</div>
                        <div scMenubarSeparator></div>
                        <div scMenubarItem value="find-text">Find...</div>
                        <div scMenubarItem value="find-replace">Find and Replace</div>
                      </ng-template>
                    </div>
                  </ng-template>
                </sc-menubar-sub>

                <div scMenubarSeparator></div>
                <div scMenubarItem value="cut">Cut</div>
                <div scMenubarItem value="copy">Copy</div>
                <div scMenubarItem value="paste">Paste</div>
              </ng-template>
            </div>
          </ng-template>
        </sc-menubar-menu>

        <!-- View menu -->
        <sc-menubar-menu>
          <div scMenubarTrigger value="View" [submenu]="viewMenu()">
            View
          </div>

          <ng-template scMenubarPortal>
            <div scMenubarContent #viewMenuRef="ngMenu">
              <ng-template scMenubarContentDef>
                <div scMenubarItem value="always-show-bookmarks">
                  Always Show Bookmarks Bar
                </div>
                <div scMenubarItem value="always-show-urls">
                  Always Show Full URLs
                </div>
                <div scMenubarSeparator></div>
                <div scMenubarItem value="reload" [inset]="true">
                  Reload
                  <span scMenubarShortcut>&#8984;R</span>
                </div>
                <div scMenubarItem value="force-reload" [inset]="true" [disabled]="true">
                  Force Reload
                  <span scMenubarShortcut>&#8679;&#8984;R</span>
                </div>
                <div scMenubarSeparator></div>
                <div scMenubarItem value="fullscreen" [inset]="true">
                  Toggle Fullscreen
                </div>
                <div scMenubarSeparator></div>
                <div scMenubarItem value="hide-sidebar" [inset]="true">
                  Hide Sidebar
                </div>
              </ng-template>
            </div>
          </ng-template>
        </sc-menubar-menu>

        <!-- Profiles menu -->
        <sc-menubar-menu>
          <div scMenubarTrigger value="Profiles" [submenu]="profilesMenu()">
            Profiles
          </div>

          <ng-template scMenubarPortal>
            <div scMenubarContent #profilesMenuRef="ngMenu">
              <ng-template scMenubarContentDef>
                <div scMenubarItem value="andy" [inset]="true">Andy</div>
                <div scMenubarItem value="benoit" [inset]="true">Benoit</div>
                <div scMenubarItem value="luis" [inset]="true">Luis</div>
                <div scMenubarSeparator></div>
                <div scMenubarItem value="edit-profiles" [inset]="true">Edit...</div>
                <div scMenubarSeparator></div>
                <div scMenubarItem value="add-profile" [inset]="true">Add Profile...</div>
              </ng-template>
            </div>
          </ng-template>
        </sc-menubar-menu>
      </div>
    </section>
  `,
})
export class MenubarDemo {
  readonly fileMenu = viewChild('fileMenuRef', { read: Menu });
  readonly shareMenu = viewChild('shareMenuRef', { read: Menu });
  readonly editMenu = viewChild('editMenuRef', { read: Menu });
  readonly findMenu = viewChild('findMenuRef', { read: Menu });
  readonly viewMenu = viewChild('viewMenuRef', { read: Menu });
  readonly profilesMenu = viewChild('profilesMenuRef', { read: Menu });
}
