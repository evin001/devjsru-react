export function escapeHtml(text) {
    if (text) {
        return text
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'');
    }

    return '';
}

export function stripTags(value) {
    if (value) {
        return value.replace(/(<([^>]+)>)/ig, '');
    }

    return '';
}
