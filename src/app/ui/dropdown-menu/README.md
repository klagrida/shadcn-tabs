# Dropdown Menu Architecture

## Overview

Shadcn-styled wrapper components around `@angular/aria/menu` directives. `ScDropdownMenuProvider` is the root component that encapsulates `CdkConnectedOverlay` for overlay positioning and auto-flip.

## Layer diagram

```
ScDropdownMenuProvider (root — manages CdkConnectedOverlay internally)
  |
  |-- <ng-content /> (projects trigger)
  |     |-- ScDropdownMenuTrigger   --> hostDirective: MenuTrigger
  |
  |-- CdkConnectedOverlay (internal, driven by trigger.expanded())
  |     |
  |     |-- ScDropdownMenuPopover (ng-template directive, captures TemplateRef)
  |           |
  |           |-- ScDropdownMenu      --> hostDirective: Menu
  |                 |
  |                 |-- ScDropdownMenuContentTemplate --> hostDirective: MenuContent (deferred)
  |                       |
  |                       |-- ScDropdownMenuLabel
  |                       |-- ScDropdownMenuSeparator
  |                       |-- ScDropdownMenuGroup
  |                       |     |-- ScDropdownMenuItem  --> hostDirective: MenuItem
  |                       |           |-- ScDropdownMenuShortcut
```

## How ScDropdownMenuProvider works

`ScDropdownMenuProvider` is the root provider component (`display: contents`). It:

1. Projects the trigger via `<ng-content />`
2. Queries the `MenuTrigger` host directive via `contentChild(MenuTrigger)`
3. Queries the `ScDropdownMenuPopover` template via `contentChild(ScDropdownMenuPopover)`
4. Internally creates a `CdkConnectedOverlay` wired to:
   - `open` = `trigger.expanded()`
   - `origin` = `trigger.element`
   - `positions` = configurable fallback positions (default: below-start, above-start, below-end, above-end)
   - `offsetY` = configurable (default: 4)
5. Renders the popover template inside the overlay via `ngTemplateOutlet`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `positions` | `ConnectedPosition[]` | 4 fallback positions | CDK overlay position strategy |
| `offsetY` | `number` | `4` | Vertical offset from trigger |

## Key relationships

### Trigger <-> Menu connection

`MenuTrigger` connects to `Menu` via the `[menu]` input. Because the menu lives inside the overlay (only rendered when open), the consumer uses `viewChild(Menu)` to get the reference:

```typescript
readonly menu = viewChild(Menu);
```

```html
<button scDropdownMenuTrigger [menu]="menu()">Open</button>
```

`viewChild(Menu)` returns `undefined` until the overlay renders. `MenuTrigger` accepts `Menu | undefined`, so this works.

### Overlay positioning & auto-flip

`CdkConnectedOverlay` (inside `ScDropdownMenuProvider`) handles:
- Rendering menu content into a CDK overlay container
- Positioning relative to the trigger element
- **Auto-flip**: the `positions` array defines fallback positions. When below-start doesn't fit, it tries above-start, etc.

The consumer can override positions via the input:
```html
<sc-dropdown-menu-provider [positions]="customPositions">
```

### Deferred content

`Menu` has `DeferredContentAware` as a host directive. `MenuContent` (wrapped by `ScDropdownMenuContentTemplate`) has `DeferredContent`. Together they lazily render menu items only when the menu becomes visible.

## Component breakdown

| Component | Type | Angular Aria directive | Purpose |
|---|---|---|---|
| `ScDropdownMenuProvider` | Component | none | Root provider, manages CdkConnectedOverlay |
| `ScDropdownMenuTrigger` | Directive | `MenuTrigger` | Button/element that opens the menu |
| `ScDropdownMenuPopover` | Directive | none | Captures `ng-template` TemplateRef for the overlay |
| `ScDropdownMenu` | Component | `Menu` | Styled menu container |
| `ScDropdownMenuContentTemplate` | Directive | `MenuContent` | Lazy rendering wrapper (`ng-template`) |
| `ScDropdownMenuItem` | Component | `MenuItem` | Menu item with `value`, `inset`, `variant` |
| `ScDropdownMenuGroup` | Directive | none | Structural grouping (`role="group"`) |
| `ScDropdownMenuLabel` | Directive | none | Section label with optional `inset` |
| `ScDropdownMenuSeparator` | Directive | none | Visual separator (`role="separator"`) |
| `ScDropdownMenuShortcut` | Directive | none | Keyboard shortcut hint text |

## Known limitations

- **Chicken-and-egg with overlay**: `[menu]` is `undefined` on first render because the menu is inside the overlay template. `viewChild(Menu)` resolves reactively once the overlay opens.
- **Phase 1 scope**: No checkbox items, radio items, or submenus yet.

## Consumer usage pattern

```html
<sc-dropdown-menu-provider>
  <button scDropdownMenuTrigger [menu]="menu()">Open</button>

  <ng-template scDropdownMenuPopover>
    <div scDropdownMenu #menuRef="ngMenu" (onSelect)="handleSelect($event)">
      <ng-template scDropdownMenuContentTemplate>
        <div scDropdownMenuLabel>Section</div>
        <div scDropdownMenuSeparator></div>
        <div scDropdownMenuItem value="action">
          Action
          <span scDropdownMenuShortcut>⌘A</span>
        </div>
      </ng-template>
    </div>
  </ng-template>
</sc-dropdown-menu-provider>
```

```typescript
readonly menu = viewChild(Menu);
```
