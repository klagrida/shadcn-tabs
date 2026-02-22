# Combobox

A searchable dropdown built on top of `@angular/aria` primitives (`Combobox`, `Listbox`, `Option`) with CDK overlay positioning.

## Components

| Component | Selector | Description |
|---|---|---|
| `ScCombobox` | `[scCombobox]` | Root wrapper. Wraps `Combobox` host directive. Supports `filterMode`, `disabled`, `readonly`, `alwaysExpanded` inputs. Exposes `expanded` signal, `value` model, and `combobox` instance. |
| `ScComboboxTrigger` | `[scComboboxTrigger]` | Trigger button area with a hidden `ComboboxInput` and a chevron icon. Acts as the CDK overlay origin. Inputs: `aria-label`, `placeholder`. |
| `ScComboboxValue` | `[scComboboxValue]` | Display slot for the selected value text, placed inside the trigger. |
| `ScComboboxPortal` | `[scComboboxPortal]` | `ng-template` directive that projects its content into the parent `ScCombobox`'s popup container via CDK overlay. |
| `ScComboboxPopup` | `[scComboboxPopup]` | Popup container with show/hide transitions tied to the parent combobox's expanded state. |
| `ScComboboxInput` | `[scComboboxInput]` | Search input with a magnifying glass icon. Two-way `value` model for the search string. Input: `placeholder`. |
| `ScComboboxList` | `[scComboboxList]` | Listbox container wrapping the `Listbox` host directive. Handles scroll-to-active and scroll reset. Exposes `values`/`valuesChange` from the underlying listbox. |
| `ScComboboxOption` | `[scComboboxOption]` | Individual option wrapping the `Option` host directive. Built-in checkmark icon. Inputs: `value`, `label`, `disabled`. |
| `ScComboboxEmpty` | `[scComboboxEmpty]` | Empty state message shown when no options match the search. |

## Architecture

The combobox uses a two-level `Combobox` pattern:

1. **Outer combobox** (`readonly`) — acts as the trigger. Clicking it opens the popup via CDK overlay.
2. **Inner combobox** (`alwaysExpanded`, `filterMode="manual"`) — lives inside the popup and contains the search input and option list.

Each `ScCombobox` uses `ScComboboxPortal` to project popup content into its `ComboboxPopupContainer`. When `alwaysExpanded` is set, the portal content renders inline (no overlay); otherwise it renders via `cdkConnectedOverlay`.

## Usage

```html
<div scCombobox #combo="scCombobox" [readonly]="true" class="w-60 border border-input rounded-lg">
  <!-- Trigger -->
  <div scComboboxTrigger aria-label="Country selector" placeholder="Select a country...">
    <span scComboboxValue>{{ displayValue() }}</span>
  </div>

  <!-- Popup -->
  <ng-template scComboboxPortal>
    <div scComboboxPopup>
      <div scCombobox filterMode="manual" [alwaysExpanded]="true" class="border-none">
        <!-- Search input -->
        <div scComboboxInput [(value)]="searchString" placeholder="Search..."></div>

        <!-- Options -->
        <ng-template scComboboxPortal>
          @if (filteredOptions().length === 0) {
            <div scComboboxEmpty>No results found</div>
          }
          <div scComboboxList [(values)]="selectedValues">
            @for (option of filteredOptions(); track option) {
              <div scComboboxOption [value]="option" [label]="option">
                <span class="flex-1">{{ option }}</span>
              </div>
            }
          </div>
        </ng-template>
      </div>
    </div>
  </ng-template>
</div>
```

### Closing on selection

Use an `afterRenderEffect` to close the outer combobox and reset the search when a value is selected:

```typescript
outerCombobox = viewChild.required<ScCombobox>('combo');
selectedValues = signal<string[]>([]);
searchString = signal('');

constructor() {
  afterRenderEffect(() => {
    if (this.selectedValues().length > 0) {
      untracked(() => {
        this.outerCombobox().combobox.close();
        this.searchString.set('');
      });
    }
  });
}
```

## Accessibility

- Keyboard navigation (arrow keys, Enter, Escape) is handled by the underlying `@angular/aria` primitives.
- The trigger includes an `aria-label` input for screen readers.
- Active and selected states use `data-[active=true]` and `aria-selected` attributes for styling.
- The chevron icon and checkmark icon are marked `aria-hidden="true"`.
