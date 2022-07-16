
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import _logger from './logger'
import _toTitleCase from './to-title-case'
const isType = (type) => (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`

export const toTitleCase = _toTitleCase
export const logger = _logger

export const isAsyncFunction = isType('AsyncFunction')
export const isGeneralFunction = isType('Function')
export const isPromise = isType('Promise')
export const isFunction = (fn) => [isAsyncFunction, isGeneralFunction].some(check => check(fn))

export const isInVisualEditor = () => {
    return ['/visualEditor/appBuilder.app', '/flexipageEditor/surface.app'].includes(window.location.pathname)
}

export const dcMixin = (clazz) => class extends clazz {

    constructor() {
        super()
        this.logger = logger(this.constructor)
    }
    toggleLoading(show = true, action, fireEvent, pageRef) {
        
        fireEvent(pageRef, 'dcLoadingElement', {
            action: action,
            showLoading: show
        })
    }
    showToast(config) {
        this.dispatchEvent(
            new ShowToastEvent(config)
        );
    }
}


export const getDefaultPageRef = () => {
    let { pathname = '' } = window.location
    let pageRef = { type: '', attributes: {}, state: {} }
    if (pathname.endsWith('.app')) {
        pageRef.type = 'custom_env_app'
        pageRef.attributes.apiName = pathname
        pageRef.state = {}
    }
    return pageRef
}