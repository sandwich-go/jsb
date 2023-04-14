function textWidth(str = '') {
    const dom = document.createElement('span');
    dom.style.display = 'inline-block';
    dom.textContent = str;
    document.body.appendChild(dom);
    const width = dom.clientWidth;
    document.body.removeChild(dom);
    return width;
}

module.exports = textWidth