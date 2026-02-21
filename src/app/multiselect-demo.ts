import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';

@Component({
  selector: 'multiselect-demo',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex justify-center',
  },
  template: `
    <div ngCombobox readonly>
      <div
        #origin
        class="border-input dark:bg-input/30 dark:hover:bg-input/50 flex relative items-center rounded-lg border bg-transparent transition-colors hover:bg-accent/50 has-[[ngComboboxInput][aria-disabled=true]]:opacity-50 has-[[ngComboboxInput][aria-disabled=true]]:cursor-default"
      >
        <span class="gap-2 left-2.5 flex absolute items-center pointer-events-none">
          <span
            class="text-base leading-none material-symbols-outlined"
            translate="no"
            aria-hidden="true"
            >{{ displayIcon() }}</span
          >
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
          [class.rotate-180]="combobox()?.expanded()"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

      <ng-template ngComboboxPopupContainer>
        <ng-template
          [cdkConnectedOverlay]="{ origin, usePopover: 'inline', matchWidth: true }"
          [cdkConnectedOverlayOpen]="true"
        >
          <div
            class="bg-popover text-popover-foreground mt-1 w-full rounded-lg p-1 shadow-md ring-1 ring-foreground/10 text-sm transition-all duration-150"
            [class]="combobox()?.expanded() ? 'max-h-44 opacity-100 visible' : 'max-h-0 opacity-0 invisible overflow-hidden'"
          >
            <div ngListbox multi class="flex flex-col gap-0.5 h-full overflow-auto">
              @for (label of labels; track label.value) {
                <div
                  ngOption
                  [value]="label.value"
                  [label]="label.value"
                  class="group data-[active=true]:bg-accent data-[active=true]:text-accent-foreground aria-selected:bg-primary/5 aria-selected:text-primary flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-sm outline-hidden select-none hover:bg-accent/50"
                >
                  <span
                    class="text-base leading-none material-symbols-outlined"
                    translate="no"
                    aria-hidden="true"
                    >{{ label.icon }}</span
                  >
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
  /** A reference to the ng aria combobox. */
  combobox = viewChild<Combobox<string>>(Combobox);

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
    { value: 'Important', icon: 'label' },
    { value: 'Starred', icon: 'star' },
    { value: 'Work', icon: 'work' },
    { value: 'Personal', icon: 'person' },
    { value: 'To Do', icon: 'checklist' },
    { value: 'Later', icon: 'schedule' },
    { value: 'Read', icon: 'menu_book' },
    { value: 'Travel', icon: 'flight' },
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
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
