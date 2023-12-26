async function htmlWidth(htmlStr) {
    return new Promise((resolve) => {
        const div = document.createElement('div');
        div.style.display = 'inline-block';
        div.style.visibility = 'hidden';
        div.innerHTML = htmlStr;

        const calculateWidth = () => {
            document.body.appendChild(div);
            const width = div.clientWidth;
            document.body.removeChild(div);
            resolve(width);
        };

        requestAnimationFrame(calculateWidth);
    });
}
module.exports = htmlWidth