# Dropdown Menu Architecture

## Overview

Shadcn-styled wrapper components around `@angular/aria/menu` directives, with `CdkConnectedOverlay` for overlay positioning.

## Layer diagram

```
Consumer template (demo)
  |
  |-- ScDropdownMenuTrigger   --> hostDirective: MenuTrigger (aria/menu)
  |-- CdkConnectedOverlay     --> CDK overlay (positioning + flip)
  |     |
  |     |-- ScDropdownMenuContent      --> hostDirective: Menu (aria/menu)
  |           |
  |           |-- ScDropdownMenuContentTemplate --> hostDirective: MenuContent (deferred rendering)
  |                 |
  |                 |-- ScDropdownMenuLabel
  |                 |-- ScDropdownMenuSeparator
  |                 |-- ScDropdownMenuGroup
  |                 |     |-- ScDropdownMenuItem  --> hostDirective: MenuItem (aria/menu)
  |                 |           |-- ScDropdownMenuShortcut
```

## Key relationships

### Trigger <-> Menu connection

`MenuTrigger` connects to `Menu` via the `[menu]` input. Because the menu lives inside a `CdkConnectedOverlay` ng-template (only rendered when open), the consumer must use `viewChild(Menu)` to get the reference:

```typescript
// In consumer component
readonly menu = viewChild(Menu);
```

```html
<button scDropdownMenuTrigger [menu]="menu()" #trigger="ngMenuTrigger">Open</button>
```

`viewChild(Menu)` returns `undefined` until the overlay renders the menu. `MenuTrigger` accepts `Menu | undefined`, so this works.

### Overlay positioning

`CdkConnectedOverlay` handles:
- Rendering the menu content into a CDK overlay container
- Positioning relative to the trigger element via `[cdkConnectedOverlayOrigin]`
- **Auto-flip**: the `positions` array defines fallback positions. When the preferred position (below-start) doesn't fit, it tries the next (above-start, etc.)

```html
<ng-template
  cdkConnectedOverlay
  [cdkConnectedOverlayOpen]="trigger.expanded()"
  [cdkConnectedOverlayOrigin]="trigger.element"
  [cdkConnectedOverlayPositions]="positions"
  [cdkConnectedOverlayOffsetY]="4"
>
  <div scDropdownMenuContent>...</div>
</ng-template>
```

The consumer defines `positions` (typically bottom-start with top-start fallback).

### Deferred content

`Menu` has `DeferredContentAware` as a host directive. `MenuContent` (wrapped by `ScDropdownMenuContentTemplate`) has `DeferredContent`. Together they lazily render menu items only when the menu becomes visible.

```html
<div scDropdownMenuContent #menu="ngMenu">
  <ng-template scDropdownMenuContentTemplate>
    <!-- Items only render when menu is open -->
    <div scDropdownMenuItem value="cut">Cut</div>
  </ng-template>
</div>
```

## Component breakdown

| Component | Type | Angular Aria directive | Purpose |
|---|---|---|---|
| `ScDropdownMenuTrigger` | Directive | `MenuTrigger` | Button/element that opens the menu |
| `ScDropdownMenuContent` | Component | `Menu` | Styled menu container |
| `ScDropdownMenuContentTemplate` | Directive | `MenuContent` | Lazy rendering wrapper (`ng-template`) |
| `ScDropdownMenuItem` | Component | `MenuItem` | Individual menu item with `value`, `inset`, `variant` |
| `ScDropdownMenuGroup` | Directive | none | Structural grouping (`role="group"`) |
| `ScDropdownMenuLabel` | Directive | none | Section label with optional `inset` |
| `ScDropdownMenuSeparator` | Directive | none | Visual separator (`role="separator"`) |
| `ScDropdownMenuShortcut` | Directive | none | Keyboard shortcut hint text |

## Known limitations

- **Chicken-and-egg with overlay**: The `[menu]` binding is `undefined` on first render because the menu is inside the overlay template. `viewChild(Menu)` resolves this reactively once the overlay opens.
- **Phase 1 scope**: No checkbox items, radio items, or submenus yet.

## Consumer usage pattern

```html
<!-- Trigger -->
<button scDropdownMenuTrigger [menu]="menu()" #trigger="ngMenuTrigger">
  Open
</button>

<!-- Overlay positions the menu -->
<ng-template
  cdkConnectedOverlay
  [cdkConnectedOverlayOpen]="trigger.expanded()"
  [cdkConnectedOverlayOrigin]="trigger.element"
  [cdkConnectedOverlayPositions]="positions"
  [cdkConnectedOverlayOffsetY]="4"
>
  <div scDropdownMenuContent #menuRef="ngMenu" (onSelect)="handleSelect($event)">
    <ng-template scDropdownMenuContentTemplate>
      <div scDropdownMenuLabel>Section</div>
      <div scDropdownMenuSeparator></div>
      <div scDropdownMenuItem value="action">Action</div>
    </ng-template>
  </div>
</ng-template>
```

```typescript
readonly menu = viewChild(Menu);

readonly positions: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
];
```
