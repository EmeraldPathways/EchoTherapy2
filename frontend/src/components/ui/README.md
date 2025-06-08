# Centralized Design System

## Overview
We've implemented a centralized design system to manage the app's appearance in a clean, maintainable way. All colors, spacing, and styling are now managed from a single location.

## Files Structure
```
src/styles/
  ├── theme.css       # All design tokens and component classes
  └── globals.css     # Basic setup and theme import
```

## How to Use

### 1. CSS Custom Properties (Recommended)
Use CSS variables directly in your styles:
```css
.my-component {
  background: var(--color-primary);
  color: var(--color-primary-50);
  padding: var(--space-md);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-primary);
}
```

### 2. Tailwind Classes
Use the extended Tailwind classes:
```jsx
<div className="bg-primary text-primary-50 p-md rounded-lg shadow-primary">
  Content
</div>
```

### 3. Pre-built Component Classes
Use ready-made component classes:
```jsx
<button className="btn-primary">Click me</button>
<input className="input-primary" />
<div className="card">Card content</div>
<div className="avatar-bot">B</div>
<div className="message-bubble-user">Message</div>
```

## Design Tokens

### Colors
- `--color-primary`: #6db3bd (teal blue)
- `--color-secondary`: #bdc6ab (sage green)
- Each color has 50-900 variants

### Gradients
- `--gradient-primary`: Primary color gradient
- `--gradient-secondary`: Secondary color gradient
- `--gradient-primary-to-secondary`: Primary to secondary gradient
- `--gradient-hero`: Light background gradient

### Spacing
- `--space-xs` to `--space-2xl`: Consistent spacing scale

### Shadows
- `--shadow-primary`: Primary color shadow
- `--shadow-glow`: Glow effect

## Benefits

✅ **Single source of truth** - Change colors in one place
✅ **Consistent theming** - All components use the same tokens
✅ **Easy maintenance** - No more hunting through 6+ files
✅ **Type safety** - Tailwind integration with autocomplete
✅ **Performance** - CSS custom properties are efficient
✅ **Flexibility** - Easy to add new themes or variants

## Changing the Theme

To change colors across the entire app:
1. Open `src/styles/theme.css`
2. Update the CSS custom properties in `:root`
3. The entire app updates automatically!

Example:
```css
:root {
  --color-primary: #your-new-color;
  --color-secondary: #your-other-color;
}
```

## Migration Status

✅ Theme system created
✅ Main page updated
🔄 Components being migrated
⏳ ChatWindow component next
⏳ MessageBubble component next
⏳ MessageInput component next
