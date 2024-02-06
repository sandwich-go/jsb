function  extractTextFromHTML(html, param = {}) {
    const { maxLength } = param;
    if ((html != null ? html : '').trim().length === 0) {
        return '';
    }
    if (maxLength && html && html.length > maxLength) {
        html = html.slice(0, maxLength);
    }
    return new DOMParser().parseFromString(html, 'text/html').body.innerText;
}

module.exports = extractTextFromHTML