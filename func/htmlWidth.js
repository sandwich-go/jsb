function htmlWidth(htmlStr = '') {
    const div = document.createElement('div');
    div.style.display = 'inline-block';
    div.style.visibility = 'hidden';
    div.innerHTML = htmlStr;
    document.body.appendChild(div);
    const width = div.clientWidth;
    document.body.removeChild(div);
    return width;
}

module.exports = htmlWidth