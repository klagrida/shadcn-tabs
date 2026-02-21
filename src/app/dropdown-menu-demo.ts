import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { Menu, MenuContent, MenuItem, MenuTrigger } from '@angular/aria/menu';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'dropdown-menu-demo',
  imports: [Menu, MenuContent, MenuItem, MenuTrigger, OverlayModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <button ngMenuTrigger #origin #trigger="ngMenuTrigger" [menu]="formatMenu()">
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
        <div ngMenu class="menu" #formatMenu="ngMenu">
          <ng-template ngMenuContent>
            <div ngMenuItem value="Mark as read">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >mark_email_read</span
              >
              <span class="label">Mark as read</span>
            </div>
            <div ngMenuItem value="Snooze">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >snooze</span
              >
              <span class="label">Snooze</span>
            </div>
            <div role="separator" aria-orientation="horizontal" class="separator"></div>
            <div
              ngMenuItem
              class="menu-item"
              value="Categorize"
              #categorizeItem
              [submenu]="categorizeMenu()"
            >
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >category</span
              >
              <span class="label">Categorize</span>
              <span class="icon material-symbols-outlined arrow" translate="no" aria-hidden="true"
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
                <div ngMenu class="menu" #categorizeMenu="ngMenu">
                  <ng-template ngMenuContent>
                    <div ngMenuItem value="Mark as important">
                      <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                        >label_important</span
                      >
                      <span class="label">Mark as important</span>
                    </div>
                    <div ngMenuItem value="Star">
                      <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                        >star</span
                      >
                      <span class="label">Star</span>
                    </div>
                    <div ngMenuItem value="Label">
                      <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                        >label</span
                      >
                      <span class="label">Label</span>
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>

            <div role="separator" aria-orientation="horizontal" class="separator"></div>
            <div ngMenuItem value="Archive">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >archive</span
              >
              <span class="label">Archive</span>
            </div>
            <div ngMenuItem value="Report spam">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >report</span
              >
              <span class="label">Report spam</span>
            </div>
            <div ngMenuItem value="Delete">
              <span class="icon material-symbols-outlined" translate="no" aria-hidden="true"
                >delete</span
              >
              <span class="label">Delete</span>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,

  styles: `
    @import url('https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined');
    :host {
      display: flex;
      justify-content: center;
      font-family: var(--inter-font);
      --border-color: color-mix(in srgb, var(--full-contrast) 20%, var(--page-background));
    }
    [ngMenuTrigger] {
      display: flex;
      cursor: pointer;
      align-items: center;
      padding: 0.6rem 2rem;
      border-radius: 0.5rem;
      color: var(--primary-contrast);
      border: 1px solid var(--border-color);
      background-color: var(--page-background);
    }
    [ngMenuTrigger] .icon {
      font-size: 1.5rem;
      opacity: 0.875;
    }
    [ngMenu] {
      margin: 0;
      width: 15rem;
      padding: 0.25rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border-color);
      background-color: var(--page-background);
    }
    [ngMenu][data-visible='false'] {
      display: none;
    }
    [ngMenuItem] {
      outline: none;
      display: flex;
      cursor: pointer;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      font-size: 0.875rem;
      border-radius: 0.25rem;
    }
    [ngMenuTrigger]:hover,
    [ngMenuItem][data-active='true'] {
      background: color-mix(in srgb, var(--border-color) 10%, transparent);
    }
    [ngMenuItem]:focus,
    [ngMenuTrigger]:focus {
      outline: 2px solid var(--vivid-pink);
    }
    [ngMenuItem] .icon {
      opacity: 0.875;
      font-size: 1.25rem;
    }
    [ngMenuItem] .label {
      flex: 1;
      opacity: 0.875;
      font-size: 0.875rem;
    }
    [ngMenuItem]:not([aria-expanded='true']) .arrow {
      opacity: 0.5;
    }
    [ngMenu] .separator {
      border-top: 1px solid var(--border-color);
      margin: 0.25rem 0;
      opacity: 0.25;
    }
  `,
})
export class DropdownMenuDemo {
  formatMenu = viewChild<Menu<string>>('formatMenu');
  categorizeMenu = viewChild<Menu<string>>('categorizeMenu');
}
