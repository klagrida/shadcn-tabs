import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from './menu';

@Component({
  selector: 'menu-demo',
  imports: [
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center font-sans',
  },
  template: `
    <div scMenuProvider>
      <button scMenuTrigger>3-Level Menu</button>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="new-file">New File</div>
            <div scMenuItem value="open">Open</div>
            <div scMenuSeparator></div>

            <!-- Level 1 submenu -->
            <div scMenuItem value="share">
              Share
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

              <ng-template scMenuPortal>
                <div scMenu>
                  <ng-template scMenuContent>
                    <div scMenuItem value="email">Email</div>
                    <div scMenuItem value="message">Message</div>
                    <div scMenuSeparator></div>

                    <!-- Level 2 submenu -->
                    <div scMenuItem value="social">
                      Social Media
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

                      <ng-template scMenuPortal>
                        <div scMenu>
                          <ng-template scMenuContent>
                            <div scMenuItem value="twitter">Twitter</div>
                            <div scMenuItem value="facebook">Facebook</div>
                            <div scMenuItem value="linkedin">LinkedIn</div>
                          </ng-template>
                        </div>
                      </ng-template>
                    </div>

                    <div scMenuItem value="link">Copy Link</div>
                  </ng-template>
                </div>
              </ng-template>
            </div>

            <div scMenuSeparator></div>
            <div scMenuItem value="save">Save</div>
            <div scMenuItem value="delete">Delete</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
})
export class MenuDemo {}
