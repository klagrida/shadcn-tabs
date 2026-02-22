import { ComboboxInput } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { ScMultiselectList } from './ui/multiselect/multiselect-list';
import { ScMultiselectOption } from './ui/multiselect/multiselect-option';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ScMultiselect } from './ui/multiselect/multiselect';
import { ScMultiselectPortal } from './ui/multiselect/multiselect-portal';

@Component({
  selector: 'multiselect-demo',
  imports: [
    ScMultiselect,
    ScMultiselectPortal,
    ComboboxInput,
    CdkOverlayOrigin,
    ScMultiselectList,
    ScMultiselectOption,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center',
  },
  template: `
    <div scMultiselect readonly>
      <div
        cdkOverlayOrigin
        class="border-input dark:bg-input/30 dark:hover:bg-input/50 flex relative items-center rounded-lg border bg-transparent transition-colors hover:bg-accent/50 has-[[ngComboboxInput][aria-disabled=true]]:opacity-50 has-[[ngComboboxInput][aria-disabled=true]]:cursor-default"
      >
        <span class="gap-2 left-2.5 flex absolute items-center pointer-events-none">
          @if (displayIcon(); as icon) {
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0" aria-hidden="true">
              <path [attr.d]="icon" />
            </svg>
          }
          <span class="text-sm select-none">{{ displayValue() }}</span>
        </span>
        <input
          aria-label="Label dropdown"
          placeholder="Select a label"
          ngComboboxInput
          class="opacity-0 cursor-pointer px-14 h-8 border-none bg-transparent outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="text-muted-foreground size-4 shrink-0 opacity-50 absolute right-2.5 pointer-events-none transition-transform duration-150"
          [class.rotate-180]="multiselect()?.expanded()"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <ng-template scMultiselectPortal>
        <div
          class="bg-popover text-popover-foreground mt-1 w-full rounded-lg p-1 shadow-md ring-1 ring-foreground/10 text-sm transition-all duration-150"
          [class]="multiselect()?.expanded() ? 'max-h-44 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'"
        >
          <div scMultiselectList multi>
            @for (label of labels; track label.value) {
              <div
                scMultiselectOption
                [value]="label.value"
                [label]="label.value"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0" aria-hidden="true">
                  <path [attr.d]="label.icon" />
                </svg>
                <span class="flex-1">{{ label.value }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="size-4 shrink-0 opacity-0 group-aria-selected:opacity-100"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: ``,
})
export class MultiselectDemo {
  /** The combobox listbox popup. */
  listbox = viewChild<Listbox<string>>(Listbox);
  /** The options available in the listbox. */
  options = viewChildren<Option<string>>(Option);
  /** A reference to the multiselect wrapper. */
  multiselect = viewChild(ScMultiselect);

  /** The icon that is displayed in the combobox. */
  displayIcon = computed(() => {
    const values = this.listbox()?.values() || [];
    const label = this.labels.find((l) => l.value === values[0]);
    return label ? label.icon : '';
  });

  /** The string that is displayed in the combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    if (values.length === 0) {
      return 'Select a label';
    }
    if (values.length === 1) {
      return values[0];
    }
    return `${values[0]} + ${values.length - 1} more`;
  });

  /** The labels that are available for selection. */
  labels = [
    { value: 'Important', icon: 'M4 7.2A2.2 2.2 0 0 1 6.2 5h11.6A2.2 2.2 0 0 1 20 7.2v.6L12 13 4 7.8zM4 10l8 5 8-5v6.8a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 16.8z' },
    { value: 'Starred', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z' },
    { value: 'Work', icon: 'M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z' },
    { value: 'Personal', icon: 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
    { value: 'To Do', icon: 'M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M9 11l3 3L22 4' },
    { value: 'Later', icon: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2' },
    { value: 'Read', icon: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' },
    { value: 'Travel', icon: 'M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z' },
  ];

  constructor() {
    // Scrolls to the active item when the active option changes.
    // The slight delay here is to ensure animations are done before scrolling.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({ block: 'nearest' }), 50);
    });
    // Resets the listbox scroll position when the combobox is closed.
    afterRenderEffect(() => {
      if (!this.multiselect()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
