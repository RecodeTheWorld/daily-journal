# Daily Journal - Minimalist Reflection App

A clean, distraction-free web application for daily journaling and reflection. Built with vanilla HTML, CSS, and JavaScript using an earthy green and cream color scheme.

## Features

### 📝 **Today's Entry**
- Write and save daily reflections in a spacious, focused textarea
- Auto-save detection to prevent accidental data loss
- Simple, clutter-free interface for distraction-free writing
- Keyboard shortcut: `Ctrl+S` (or `Cmd+S` on Mac) to save quickly

### 🏷️ **Tags**
- Add multiple tags to your entries (comma-separated)
- Organize reflections by themes, moods, or topics
- View all tags with entry counts
- Click on tags to filter entries by topic
- Duplicate tags are automatically removed

### 📖 **Past Entries**
- Browse all your previous journal entries
- Filter entries by specific date
- View entry previews with tags
- Click on any entry to read the full text in a modal
- Entries are sorted by date (newest first)

### 📤 **Export Data**
- Export your journal in multiple formats:
  - **JSON**: For data portability and backup
  - **CSV**: For spreadsheet applications
  - **Text**: For easy reading and printing
- Select custom date ranges for exports
- Full backup option to download all entries at once

### 🌿 **Design**
- Earthy green (`#5a8f6c`) and cream (`#f5f1e8`) color palette
- Minimalist interface with smooth animations
- Responsive design (works on desktop, tablet, mobile)
- Accessible form controls and interactions

## Getting Started

### Installation

1. Clone or download this repository:
```bash
git clone https://github.com/RecodeTheWorld/daily-journal.git
cd daily-journal
```

2. Open `index.html` in your web browser:
   - Simply double-click `index.html`, or
   - Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     # Then visit http://localhost:8000
     
     # Using Node.js (if installed)
     npx http-server
     ```

### File Structure

```
daily-journal/
├── index.html           # Main HTML file
├── assets/
│   ├── styles.css      # Styling with color scheme
│   └── app.js          # Application logic
├── README.md           # This file
└── LICENSE             # MIT License
```

## Usage Guide

### Writing a Daily Entry

1. Click **"Today"** in the sidebar
2. Write your reflections in the text area
3. (Optional) Add tags separated by commas (e.g., "grateful, reflection, growth")
4. Click **"Save Entry"** or press `Ctrl+S`
5. Success message confirms the save

### Adding Tags

- Type tags in the tag input field, separated by commas
- Press `Enter` or click outside the field to add them
- Tags appear as green pills above the save button
- Click the `×` on any tag to remove them
- Tags are stored with each entry

### Browsing Past Entries

1. Click **"Past Entries"** in the sidebar
2. All entries appear sorted by date (newest first)
3. (Optional) Use the date picker to filter by a specific date
4. Click any entry card to open it in a modal and read the full text

### Managing Tags

1. Click **"Tags"** in the sidebar
2. See all tags you've used with entry counts
3. Click any tag card to view all entries with that tag
4. Tag cards are sorted by frequency (most used first)

### Exporting Your Data

1. Click **"Export"** in the sidebar
2. Choose your export format:
   - **JSON**: Machine-readable format (best for backup)
   - **CSV**: Open in Excel/Sheets with columns: Date, Tags, Entry
   - **Text**: Human-readable format (good for printing)
3. (Optional) Set a date range using the date inputs
4. Click **"Export Data"** to download
5. Or click **"Backup All Data"** to save everything in JSON format

## Data Storage

- All data is stored locally in your browser's **localStorage**
- Data persists between browser sessions
- No data is sent to any server
- Clearing browser data/cache will delete your entries
- **Regular backups recommended** - use the Export feature

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` / `Cmd+S` | Save current entry (Today view) |
| `Esc` | Close modal |
| `Enter` (in tags field) | Add tags |

## Browser Support

- Chrome/Chromium (60+)
- Firefox (55+)
- Safari (12+)
- Edge (79+)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Security

- **100% local storage** - all data stays on your device
- **No tracking** - no analytics or external services
- **No login required** - use completely offline
- **Your data is yours** - use the export feature anytime

## Customization

### Change Color Scheme

Edit `assets/styles.css` and modify the CSS variables:

```css
:root {
    --primary-green: #5a8f6c;    /* Main accent color */
    --dark-green: #3d5f4f;       /* Dark accent */
    --light-green: #7da89e;      /* Light accent */
    --cream: #f5f1e8;            /* Background */
    --cream-dark: #e8e0d5;       /* Light borders */
}
```

### Font Changes

Update the font-family in the body selector in `assets/styles.css`

## Troubleshooting

### Entries not saving?
- Check if localStorage is enabled in your browser
- Try clearing browser cache and reload
- Ensure JavaScript is enabled

### Data disappeared?
- Check if you accidentally cleared browser storage
- Use the exported JSON backup to restore
- Note: Private/Incognito windows don't persist data

### Export not working?
- Make sure you have entries to export
- Check if your browser allows file downloads
- Try a different export format

## Tips for Better Journaling

1. **Be consistent** - Set a daily journaling habit
2. **Use tags strategically** - Create meaningful categories for reflection
3. **Regular backups** - Export your data monthly to preserve memories
4. **Reflect on patterns** - Use the Tags view to identify themes in your reflections
5. **Write freely** - This is your private space, write without judgment

## Contributing

Found a bug or have a feature suggestion? Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Changelog

### Version 1.0.0 (Initial Release)
- ✅ Daily entry creation and editing
- ✅ Tag management system
- ✅ Past entries browsing with date filtering
- ✅ Export in multiple formats (JSON, CSV, Text)
- ✅ Full data backup capability
- ✅ Responsive design
- ✅ Local storage with no external dependencies

---

**Made with 💚 for mindful reflection**

Start journaling today. Your future self will thank you.
