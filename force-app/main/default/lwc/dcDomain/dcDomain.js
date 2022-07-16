import { LightningElement ,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/dcPubsub';
import { isFunction, dcMixin, isInVisualEditor, getDefaultPageRef } from "c/dcUtils";
import domainTemplate from './dcDomain.html';
import visualEditorTemplate from './visualEditor.html';
export default class DcDomain extends dcMixin(LightningElement) {
    @wire(CurrentPageReference) pageRef = getDefaultPageRef()

    connectedCallback() {
        if (isInVisualEditor()) {
            this.visualEditor = {
                domain: this.constructor.name
            }
        }
        let domainName = 'DcDomain'
        registerListener(domainName, async (action) => {
            this.logger.info(`[DcDomain]handle action= + ${JSON.stringify(action)}`)
            let method = `handle${action.type}`
            if (isFunction(this[method])) {
                this.sendEventResult(await this[method](action))
            } else {
                this.logger.warn(`method: ${method} not existed`)
            }
        }, this)
    }

    callNextAction(action, showLoading=true) {
        setTimeout(() => {
            if (showLoading === true) {
                fireEvent(this.pageRef, 'dcLoadingElement', {
                    action: action, 
                    isLoading: showLoading
                })
            }
            fireEvent(this.pageRef, 'DcDomain', action)
        }, 100)
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }


    sendEventResult(result) {
        if (result) {
            fireEvent(this.pageRef, 'DcElement', result);
        }
    }

    buidlMessage(title, message, variant = 'error') {
        return {
            title: title,
            message: message,
            variant: variant
        }
    }

    render() {
        return isInVisualEditor() ? visualEditorTemplate : domainTemplate
    }
}