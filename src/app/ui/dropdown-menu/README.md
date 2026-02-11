# Dropdown Menu Architecture

## Overview

Shadcn-styled wrapper components around `@angular/aria/menu` directives. `ScDropdownMenuProvider` and `ScDropdownMenuSubProvider` encapsulate `CdkConnectedOverlay` for overlay positioning and auto-flip.

## Layer diagram

```
ScDropdownMenuProvider (root — manages CdkConnectedOverlay internally)
  |
  |-- <ng-content /> (projects trigger)
  |     |-- ScDropdownMenuTrigger   --> hostDirective: MenuTrigger
  |
  |-- CdkConnectedOverlay (internal, driven by trigger.expanded())
        |
        |-- ScDropdownMenuPortal (ng-template, captures TemplateRef)
              |
              |-- ScDropdownMenu      --> hostDirective: Menu (exportAs: "ngMenu")
                    |
                    |-- ScDropdownMenuContent --> hostDirective: MenuContent (deferred)
                          |
                          |-- ScDropdownMenuLabel
                          |-- ScDropdownMenuSeparator
                          |-- ScDropdownMenuGroup
                          |     |-- ScDropdownMenuItem  --> hostDirective: MenuItem
                          |           |-- ScDropdownMenuShortcut
                          |
                          |-- ScDropdownMenuSubProvider (submenu — manages CdkConnectedOverlay)
                                |
                                |-- ScDropdownMenuSubTrigger --> hostDirective: MenuItem
                                |
                                |-- CdkConnectedOverlay (driven by parentMenu.visible())
                                      |
                                      |-- ScDropdownMenuPortal (reused)
                                            |
                                            |-- ScDropdownMenuSub --> hostDirective: Menu
                                                  |
                                                  |-- ScDropdownMenuContent (reused)
                                                        |-- ScDropdownMenuItem ...
```

## How ScDropdownMenuProvider works

`ScDropdownMenuProvider` is the root component (`display: contents`). It:

1. Projects the trigger via `<ng-content />`
2. Queries the `MenuTrigger` host directive via `contentChild(MenuTrigger)`
3. Queries the `ScDropdownMenuPortal` template via `contentChild(ScDropdownMenuPortal)`
4. Internally creates a `CdkConnectedOverlay` wired to:
   - `open` = `trigger.expanded()`
   - `origin` = `trigger.element`
   - `positions` = configurable fallback positions (default: below-start, above-start, below-end, above-end)
   - `offsetY` = configurable (default: 4)
5. Renders the portal template inside the overlay via `ngTemplateOutlet`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `positions` | `ConnectedPosition[]` | 4 fallback positions | CDK overlay position strategy |
| `offsetY` | `number` | `4` | Vertical offset from trigger |

## How ScDropdownMenuSubProvider works

`ScDropdownMenuSubProvider` mirrors `ScDropdownMenuProvider` but for submenus. It:

1. Injects the parent `Menu` via `inject(Menu)`
2. Queries `ScDropdownMenuSubTrigger` via `contentChild(ScDropdownMenuSubTrigger)`
3. Queries `ScDropdownMenuPortal` via `contentChild(ScDropdownMenuPortal)`
4. Internally creates a `CdkConnectedOverlay` wired to:
   - `open` = `parentMenu.visible()` (overlay exists whenever the parent menu is open)
   - `origin` = `subTrigger.element`
   - `positions` = adjacent positions (default: right, left flip)
   - `offsetX` = configurable (default: 4)

Angular Aria handles hover/keyboard expansion internally once `[submenu]` connects.

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `positions` | `ConnectedPosition[]` | right, left flip | CDK overlay position strategy |
| `offsetX` | `number` | `4` | Horizontal offset from trigger item |

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

### SubTrigger <-> Submenu connection

`MenuItem` connects to a submenu `Menu` via the `[submenu]` input. Same chicken-and-egg pattern — the submenu overlay opens when `parentMenu.visible()` is true, which renders the submenu `Menu`, and `viewChild` resolves:

```typescript
readonly subMenu = viewChild('subMenuRef', { read: Menu });
```

```html
<div scDropdownMenuSubTrigger value="share" [submenu]="subMenu()">Share</div>
```

### Overlay positioning & auto-flip

`CdkConnectedOverlay` handles:
- Rendering menu content into a CDK overlay container
- Positioning relative to the origin element
- **Auto-flip**: the `positions` array defines fallback positions

### Deferred content

`Menu` has `DeferredContentAware` as a host directive. `MenuContent` (wrapped by `ScDropdownMenuContent`) has `DeferredContent`. Together they lazily render menu items only when the menu becomes visible.

### Shared styles

`dropdownMenuItemBaseStyles` is exported from `dropdown-menu-item.ts` and reused by `ScDropdownMenuSubTrigger`, which adds `data-open:bg-accent data-open:text-accent-foreground` on top.

## Component breakdown

| Component | Type | Angular Aria directive | Purpose |
|---|---|---|---|
| `ScDropdownMenuProvider` | Component | — | Root provider, manages CdkConnectedOverlay |
| `ScDropdownMenuTrigger` | Directive | `MenuTrigger` | Button/element that opens the menu |
| `ScDropdownMenuPortal` | Directive | — | Captures `ng-template` TemplateRef for the overlay |
| `ScDropdownMenu` | Component | `Menu` | Styled menu container |
| `ScDropdownMenuContent` | Directive | `MenuContent` | Lazy rendering wrapper (`ng-template`) |
| `ScDropdownMenuItem` | Component | `MenuItem` | Menu item with `value`, `inset`, `variant` |
| `ScDropdownMenuGroup` | Directive | — | Structural grouping (`role="group"`) |
| `ScDropdownMenuLabel` | Directive | — | Section label with optional `inset` |
| `ScDropdownMenuSeparator` | Directive | — | Visual separator (`role="separator"`) |
| `ScDropdownMenuShortcut` | Directive | — | Keyboard shortcut hint text |
| `ScDropdownMenuSubProvider` | Component | — | Submenu wrapper, manages CdkConnectedOverlay |
| `ScDropdownMenuSubTrigger` | Component | `MenuItem` | Submenu trigger item, styles from `dropdownMenuItemBaseStyles` |
| `ScDropdownMenuSub` | Component | `Menu` | Styled submenu container |

## Known limitations

- **Chicken-and-egg with overlay**: `[menu]` and `[submenu]` are `undefined` on first render because the menu is inside the overlay template. `viewChild(Menu)` resolves reactively once the overlay opens.
- **No checkbox/radio items yet**: Only basic menu items are supported.

## Consumer usage pattern

```html
<sc-dropdown-menu-provider>
  <button scDropdownMenuTrigger [menu]="menu()">Open</button>

  <ng-template scDropdownMenuPortal>
    <div scDropdownMenu #menuRef="ngMenu" (onSelect)="handleSelect($event)">
      <ng-template scDropdownMenuContent>
        <div scDropdownMenuLabel>My Account</div>
        <div scDropdownMenuSeparator></div>
        <div scDropdownMenuGroup>
          <div scDropdownMenuItem value="profile">
            Profile
            <span scDropdownMenuShortcut>⇧⌘P</span>
          </div>
        </div>
        <div scDropdownMenuSeparator></div>

        <sc-dropdown-menu-sub-provider>
          <div scDropdownMenuSubTrigger value="share" [submenu]="subMenu()">
            Share
          </div>

          <ng-template scDropdownMenuPortal>
            <div scDropdownMenuSub #subMenuRef="ngMenu">
              <ng-template scDropdownMenuContent>
                <div scDropdownMenuItem value="email">Email</div>
                <div scDropdownMenuItem value="message">Message</div>
              </ng-template>
            </div>
          </ng-template>
        </sc-dropdown-menu-sub-provider>

        <div scDropdownMenuSeparator></div>
        <div scDropdownMenuItem value="logout" variant="destructive">
          Log out
          <span scDropdownMenuShortcut>⇧⌘Q</span>
        </div>
      </ng-template>
    </div>
  </ng-template>
</sc-dropdown-menu-provider>
```

```typescript
readonly menu = viewChild(Menu);
readonly subMenu = viewChild('subMenuRef', { read: Menu });
```
