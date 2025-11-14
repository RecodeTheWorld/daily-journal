// Journal App - Main Application Logic

class JournalApp {
    constructor() {
        this.entries = this.loadEntries();
        this.currentTags = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTodayDate();
        this.loadTodayEntry();
    }

    // ========== Storage Management ==========
    loadEntries() {
        const stored = localStorage.getItem('journalEntries');
        return stored ? JSON.parse(stored) : {};
    }

    saveEntries() {
        localStorage.setItem('journalEntries', JSON.stringify(this.entries));
    }

    getTodayDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // ========== Today Entry Management ==========
    updateTodayDate() {
        const todayDate = this.getTodayDate();
        document.getElementById('today-date').textContent = this.formatDate(todayDate);
    }

    loadTodayEntry() {
        const todayDate = this.getTodayDate();
        const entry = this.entries[todayDate];

        if (entry) {
            document.getElementById('entry-text').value = entry.text;
            this.currentTags = [...entry.tags];
            this.renderTags();
        } else {
            document.getElementById('entry-text').value = '';
            this.currentTags = [];
            this.renderTags();
        }

        this.clearStatus();
    }

    saveEntry() {
        const todayDate = this.getTodayDate();
        const text = document.getElementById('entry-text').value.trim();

        if (!text) {
            this.showStatus('Please write something before saving.', 'error');
            return;
        }

        this.entries[todayDate] = {
            text: text,
            tags: this.currentTags,
            createdAt: this.entries[todayDate]?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.saveEntries();
        this.showStatus('✓ Entry saved successfully!', 'success');
    }

    clearEntry() {
        if (document.getElementById('entry-text').value.trim()) {
            if (confirm('Are you sure you want to clear this entry?')) {
                document.getElementById('entry-text').value = '';
                this.currentTags = [];
                this.renderTags();
                document.getElementById('tag-input').value = '';
                this.clearStatus();
            }
        }
    }

    showStatus(message, type) {
        const statusEl = document.getElementById('entry-status');
        statusEl.textContent = message;
        statusEl.className = `status-message ${type}`;

        setTimeout(() => {
            this.clearStatus();
        }, 3000);
    }

    clearStatus() {
        const statusEl = document.getElementById('entry-status');
        statusEl.className = 'status-message';
        statusEl.textContent = '';
    }

    // ========== Tags Management ==========
    parseTags(input) {
        return input
            .split(',')
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0 && tag.length <= 30)
            .filter((tag, index, self) => self.indexOf(tag) === index);
    }

    addTags() {
        const input = document.getElementById('tag-input').value;
        const newTags = this.parseTags(input);

        if (newTags.length === 0) {
            document.getElementById('tag-input').value = '';
            return;
        }

        newTags.forEach(tag => {
            if (!this.currentTags.includes(tag)) {
                this.currentTags.push(tag);
            }
        });

        document.getElementById('tag-input').value = '';
        this.renderTags();
    }

    removeTag(tag) {
        this.currentTags = this.currentTags.filter(t => t !== tag);
        this.renderTags();
    }

    renderTags() {
        const tagsList = document.getElementById('tags-list');
        tagsList.innerHTML = '';

        this.currentTags.forEach(tag => {
            const tagEl = document.createElement('div');
            tagEl.className = 'tag';
            tagEl.innerHTML = `
                ${tag}
                <button class="tag-remove" data-tag="${tag}">×</button>
            `;
            tagsList.appendChild(tagEl);
        });

        document.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                this.removeTag(btn.dataset.tag);
            });
        });
    }

    getAllTags() {
        const tagCount = {};

        Object.values(this.entries).forEach(entry => {
            entry.tags.forEach(tag => {
                tagCount[tag] = (tagCount[tag] || 0) + 1;
            });
        });

        return tagCount;
    }

    renderTagsView() {
        const tagCount = this.getAllTags();
        const tagsContainer = document.getElementById('tags-container');

        if (Object.keys(tagCount).length === 0) {
            tagsContainer.innerHTML = '<p class="empty-message">No tags yet</p>';
            return;
        }

        tagsContainer.innerHTML = '';

        const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);

        sortedTags.forEach(([tag, count]) => {
            const tagCard = document.createElement('div');
            tagCard.className = 'tag-card';
            tagCard.innerHTML = `
                <div class="tag-card-name">${tag}</div>
                <div class="tag-card-count">${count} ${count === 1 ? 'entry' : 'entries'}</div>
            `;

            tagCard.addEventListener('click', () => {
                this.filterEntriesByTag(tag);
            });

            tagsContainer.appendChild(tagCard);
        });
    }

    filterEntriesByTag(tag) {
        const filtered = Object.entries(this.entries).filter(([_, entry]) =>
            entry.tags.includes(tag)
        );

        this.renderEntriesList(filtered);
    }

    // ========== Past Entries Management ==========
    renderEntriesList(entriesToShow = null) {
        const entriesList = document.getElementById('entries-list');
        const allEntries = entriesToShow || Object.entries(this.entries);

        if (allEntries.length === 0) {
            entriesList.innerHTML = '<p class="empty-message">No entries found</p>';
            return;
        }

        entriesList.innerHTML = '';

        const sortedEntries = allEntries.sort((a, b) =>
            new Date(b[0]) - new Date(a[0])
        );

        sortedEntries.forEach(([date, entry]) => {
            const entryItem = document.createElement('div');
            entryItem.className = 'entry-item';

            const preview = entry.text.substring(0, 150) + (entry.text.length > 150 ? '...' : '');
            const tagsHTML = entry.tags.length > 0
                ? entry.tags.map(tag => `<span class="tag-small">${tag}</span>`).join('')
                : '';

            entryItem.innerHTML = `
                <div class="entry-item-header">
                    <div class="entry-item-date">${this.formatDate(date)}</div>
                </div>
                <div class="entry-item-preview">${this.escapeHtml(preview)}</div>
                ${tagsHTML ? `<div class="entry-item-tags">${tagsHTML}</div>` : ''}
            `;

            entryItem.addEventListener('click', () => {
                this.showEntryModal(date, entry);
            });

            entriesList.appendChild(entryItem);
        });
    }

    showEntryModal(date, entry) {
        const modal = document.getElementById('entry-modal');
        document.getElementById('modal-date').textContent = this.formatDate(date);
        document.getElementById('modal-body').textContent = entry.text;
        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('entry-modal').classList.remove('active');
    }

    filterEntriesByDate() {
        const dateFilter = document.getElementById('date-filter').value;

        if (!dateFilter) {
            this.renderEntriesList();
            return;
        }

        const filtered = Object.entries(this.entries).filter(([date, _]) =>
            date === dateFilter
        );

        this.renderEntriesList(filtered);
    }

    // ========== Export Management ==========
    exportData() {
        const format = document.querySelector('input[name="export-format"]:checked').value;
        const startDate = document.getElementById('export-start-date').value;
        const endDate = document.getElementById('export-end-date').value;

        const entriesToExport = this.filterEntriesByDateRange(startDate, endDate);

        if (Object.keys(entriesToExport).length === 0) {
            alert('No entries found in the selected date range.');
            return;
        }

        let content, filename, mimeType;

        switch (format) {
            case 'json':
                content = JSON.stringify(entriesToExport, null, 2);
                filename = `journal-export-${new Date().toISOString().split('T')[0]}.json`;
                mimeType = 'application/json';
                break;

            case 'csv':
                content = this.convertToCSV(entriesToExport);
                filename = `journal-export-${new Date().toISOString().split('T')[0]}.csv`;
                mimeType = 'text/csv';
                break;

            case 'txt':
                content = this.convertToText(entriesToExport);
                filename = `journal-export-${new Date().toISOString().split('T')[0]}.txt`;
                mimeType = 'text/plain';
                break;
        }

        this.downloadFile(content, filename, mimeType);
        alert('Export completed successfully!');
    }

    backupAllData() {
        const content = JSON.stringify(this.entries, null, 2);
        const filename = `journal-backup-${new Date().toISOString().split('T')[0]}.json`;
        this.downloadFile(content, filename, 'application/json');
        alert('Backup completed successfully!');
    }

    filterEntriesByDateRange(startDate, endDate) {
        const filtered = {};

        Object.entries(this.entries).forEach(([date, entry]) => {
            if (!startDate && !endDate) {
                filtered[date] = entry;
            } else if (!startDate || !endDate) {
                const checkDate = startDate || endDate;
                if (date === checkDate) {
                    filtered[date] = entry;
                }
            } else if (date >= startDate && date <= endDate) {
                filtered[date] = entry;
            }
        });

        return filtered;
    }

    convertToCSV(entries) {
        let csv = 'Date,Tags,Entry\n';

        Object.entries(entries).forEach(([date, entry]) => {
            const tags = entry.tags.join(';');
            const text = entry.text.replace(/"/g, '""').replace(/\n/g, ' ');
            csv += `"${date}","${tags}","${text}"\n`;
        });

        return csv;
    }

    convertToText(entries) {
        let text = '';

        Object.entries(entries)
            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
            .forEach(([date, entry]) => {
                text += `${'='.repeat(60)}\n`;
                text += `Date: ${this.formatDate(date)}\n`;
                if (entry.tags.length > 0) {
                    text += `Tags: ${entry.tags.join(', ')}\n`;
                }
                text += `${'='.repeat(60)}\n`;
                text += entry.text + '\n\n';
            });

        return text;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // ========== View Management ==========
    switchView(viewName) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        const viewId = `${viewName}-view`;
        document.getElementById(viewId).classList.add('active');

        document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

        if (viewName === 'past') {
            this.renderEntriesList();
            document.getElementById('date-filter').value = '';
        } else if (viewName === 'tags') {
            this.renderTagsView();
        } else if (viewName === 'today') {
            this.loadTodayEntry();
        }
    }

    // ========== Event Listeners ==========
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });

        // Entry form
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveEntry();
        });

        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearEntry();
        });

        // Tags
        document.getElementById('tag-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addTags();
            }
        });

        document.getElementById('tag-input').addEventListener('blur', () => {
            if (document.getElementById('tag-input').value.trim()) {
                this.addTags();
            }
        });

        // Past entries
        document.getElementById('date-filter').addEventListener('change', () => {
            this.filterEntriesByDate();
        });

        // Modal
        document.querySelector('.modal-close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('entry-modal').addEventListener('click', (e) => {
            if (e.target.id === 'entry-modal') {
                this.closeModal();
            }
        });

        // Export
        document.getElementById('export-btn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('backup-btn').addEventListener('click', () => {
            this.backupAllData();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                const activeView = document.querySelector('.view.active');
                if (activeView.id === 'today-view') {
                    this.saveEntry();
                }
            }

            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // ========== Utility Methods ==========
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new JournalApp();
});
