# Multiselect

A multi-selection dropdown built on top of `@angular/aria` primitives (`Combobox`, `Listbox`, `Option`) with CDK overlay positioning.

## Components

| Component | Selector | Description |
|---|---|---|
| `ScMultiselect` | `[scMultiselect]` | Root wrapper. Wraps `Combobox` host directive. Supports `filterMode`, `disabled`, `readonly`, `alwaysExpanded` inputs. Exposes `expanded` signal and two-way `value` model. |
| `ScMultiselectTrigger` | `[scMultiselectTrigger]` | Trigger button area with a hidden `ComboboxInput` and a chevron icon. Acts as the CDK overlay origin. Inputs: `aria-label`, `placeholder`. |
| `ScMultiselectValue` | `[scMultiselectValue]` | Display slot for the selected value text, placed inside the trigger. |
| `ScMultiselectPortal` | `[scMultiselectPortal]` | `ng-template` directive that projects its content into the parent `ScMultiselect`'s popup container via CDK overlay. |
| `ScMultiselectPopup` | `[scMultiselectPopup]` | Popup container with show/hide transitions tied to the parent multiselect's expanded state. |
| `ScMultiselectList` | `[scMultiselectList]` | Listbox container wrapping the `Listbox` host directive. Handles scroll-to-active and scroll reset on close. Syncs listbox values to the parent `ScMultiselect` value model. Inputs: `multi`, `disabled`, `wrap`, `typeaheadDelay`. |
| `ScMultiselectOption` | `[scMultiselectOption]` | Individual option wrapping the `Option` host directive. Built-in checkmark icon. Inputs: `value`, `label`, `disabled`. |

## Architecture

The multiselect uses a single `Combobox` in `readonly` mode — clicking the trigger toggles the popup via CDK overlay. The popup stays open while the user selects/deselects options.

```
ScMultiselect (Combobox, readonly)
├── ScMultiselectTrigger (CdkOverlayOrigin + hidden ComboboxInput)
│   └── ScMultiselectValue (display text)
└── ScMultiselectPortal (ng-template → cdkConnectedOverlay)
    └── ScMultiselectPopup (styled container)
        └── ScMultiselectList (Listbox, multi)
            └── ScMultiselectOption (Option) ×N
```

The `ScMultiselectList` syncs the `Listbox` selection back to the parent `ScMultiselect.value` model via an `effect`.

## Usage

```html
<div scMultiselect readonly [(value)]="selectedValues">
  <!-- Trigger -->
  <div scMultiselectTrigger aria-label="Label dropdown" placeholder="Select a label">
    <span scMultiselectValue>
      {{ displayValue() }}
    </span>
  </div>

  <!-- Popup -->
  <ng-template scMultiselectPortal>
    <div scMultiselectPopup>
      <div scMultiselectList multi>
        @for (item of items; track item.value) {
          <div
            scMultiselectOption
            [value]="item.value"
            [label]="item.value"
          >
            <span class="flex-1">{{ item.value }}</span>
          </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

### Displaying the selected value

Use `computed()` to derive display text from the `value` model:

```typescript
selectedValues = signal<string[]>([]);

displayValue = computed(() => {
  const values = this.selectedValues();
  if (values.length === 0) return 'Select a label';
  if (values.length === 1) return values[0];
  return `${values[0]} + ${values.length - 1} more`;
});
```

## Accessibility

- Keyboard navigation (arrow keys, Enter, Escape) is handled by the underlying `@angular/aria` primitives.
- The trigger includes an `aria-label` input for screen readers.
- Active and selected states use `data-[active=true]` and `aria-selected` attributes for styling.
- The chevron icon and checkmark icon are marked `aria-hidden="true"`.
- Set `multi` on `ScMultiselectList` to enable multi-selection with `aria-multiselectable`.
