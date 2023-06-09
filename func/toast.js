function loadCss(cssPath) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = cssPath;
    document.getElementsByTagName('head')[0].appendChild(link);
}

loadCss(require('./toast.css'));

const BACKGROUND_COLORS = {
    SUCCESS: '#57BF57',
    ERROR: '#E1715B',
    INFO: '#4D82D6',
    WARNING: '#D6A14D',
}
const POSITIONS = {
    TOP_RIGHT: 'toast-top-right',
    BOTTOM_RIGHT: 'toast-bottom-right',
    BOTTOM_LEFT: 'toast-bottom-left',
    TOP_LEFT: 'toast-top-left',
}
const getTransition = (type = 'fadeInRight', time = 0.6) =>
    `${type} ${time}s forwards`

const wait = (time) =>
    new Promise((resolve) => setTimeout(resolve, time * 1000))

const generateRandomId = () => {
    // RFC4122 version 4 compliant UUID
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
    return `toast-${id}`
}
const removeFromDocument = async (id, position) => {
    const element = document.getElementById(id)
    if (!element) return
    element.style[position] = `-${element.offsetHeight}px`
    element.style.animation = getTransition('fadeOut')
    await wait(0.3)
    if (element.parentNode) element.parentNode.removeChild(element)
}
const addToDocument = (element, position) => {
    let container = getContainer(position)
    const animation =
        position.indexOf('left') > -1 ? 'fadeInLeft' : 'fadeInRight'
    element.style.animation = getTransition(animation)
    container.appendChild(element)
}
const getContainer = (position) => {
    position = position || 'toast-top-right'
    const container = Array.from(
        document.getElementsByClassName(`toast-wrapper-${position}`)
    )
    let result
    if (container.length) {
        result = container[0]
    } else {
        const newContainer = document.createElement('div')
        newContainer.classList.add(`toast-wrapper-${position}`)
        newContainer.classList.add(position)
        document.body.appendChild(newContainer)
        result = newContainer
    }
    return result
}
const showToast = async ({
                             type = BACKGROUND_COLORS.SUCCESS,
                             text,
                             time = 3,
                             stay = false,
                             position,
                         }) => {
    let newPosition
    if (Object.values(POSITIONS).indexOf(position) > -1) {
        newPosition = position
    } else {
        newPosition = POSITIONS.TOP_RIGHT
    }
    const element = document.createElement('div')
    const id = generateRandomId()
    element.onclick = async () => removeFromDocument(id, newPosition)
    element.id = id
    element.position = newPosition
    element.textContent = text
    element.style.backgroundColor = type
    element.classList.add('toast-container')
    addToDocument(element, newPosition)
    await wait(time)
    if (!stay) {
        await removeFromDocument(id, newPosition)
    }
}
const clearAll = () => {
    document
        .querySelectorAll('[class^=toast-wrapper]')
        .forEach((i) => document.body.removeChild(i))
}
const error = ({
                   text,
                   time = 3,
                   stay = false,
                   position = POSITIONS.TOP_RIGHT,
               }) => {
    showToast({ type: BACKGROUND_COLORS.ERROR, text, time, stay, position })
}
const success = ({
                     text,
                     time = 3,
                     stay = false,
                     position = POSITIONS.TOP_RIGHT,
                 }) => {
    showToast({ type: BACKGROUND_COLORS.SUCCESS, text, time, stay, position })
}
const warning = ({
                     text,
                     time = 3,
                     stay = false,
                     position = POSITIONS.TOP_RIGHT,
                 }) => {
    showToast({ type: BACKGROUND_COLORS.WARNING, text, time, stay, position })
}
const info = ({
                  text,
                  time = 3,
                  stay = false,
                  position = POSITIONS.TOP_RIGHT,
              }) => {
    showToast({ type: BACKGROUND_COLORS.INFO, text, time, stay, position })
}
module.exports = {
    clearAll,
    error: error,
    getContainer: getContainer,
    info: info,
    success: success,
    warning: warning,
    show: showToast,
}