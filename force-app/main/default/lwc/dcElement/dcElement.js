import { LightningElement,wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners, fireEvent } from 'c/dcPubsub';
import { isFunction, dcMixin, getDefaultPageRef } from 'c/dcUtils';
export default class DcElement extends dcMixin(LightningElement) {

    //static registedEvents = []
    @wire(CurrentPageReference) pageRef = getDefaultPageRef()

    connectedCallback() {

        let registerName = 'DcElement'
        registerListener(registerName, (result) => {
            
            //this.toggleLoading(false, result.action, fireEvent, this.pageRef)
            this.dispatchLoadingAction(result.action, false)
            let functionName = 'subscribeException'
            // if (result.notification) {
            //     functionName = 'subscribeNotification'
            //     if (isFunction(this[functionName])) {
            //         this[functionName](result)
            //     } else {
            //         this.logger.warn(`method: ${functionName} not existed`)
            //     }
            // }

            if (result.action && Array.isArray(result.error) && result.error.length > 0) {
                this.dispatchExceptionAction(result.action, result.error)
            }

            if (result.action && result.action.type) {
                functionName = 'subscribe' + result.action.type
                if (isFunction(this[functionName])) {
                    this[functionName](result)
                } else {
                    this.logger.warn(`method: ${functionName} not existed`)
                }
            }

        }, this);


    }

    dispatchAction({ action, domain='DcDomain', showLoading = true }) {

        if (action === undefined || action.type === undefined) {
            throw new Error("Action format error: action must has type property.");
        }
        if (domain === undefined || domain.length === 0) {
            throw new Error("domain name is required.")
        }
        if (showLoading === true) {
            //this.toggleLoading(true, action, fireEvent, this.pageRef)
            this.dispatchLoadingAction(action, true)
        }

        fireEvent(this.pageRef, domain, action)
    }

    dispatchActionDelay({ action, domain='DcDomain', showLoading = true , delay=100}) {
        this.delayTimeout = setTimeout(() => {
            this.dispatchAction({ action: action, domain: domain, showLoading:showLoading })
        }, delay);
    }

    launchFlow(flowName, inputVariables=[],flowPubName="lanuchFlow") {
        fireEvent(this.pageRef, flowPubName, {
            flow: flowName, 
            inputVariables: inputVariables
        })
    }

    disconnectedCallback() {
        unregisterAllListeners(this)
    }

    dispatchLoadingAction(action, isLoading) {
        fireEvent(this.pageRef, 'dcLoadingElement', {
            action: action, 
            isLoading: isLoading
        })
    }
    dispatchExceptionAction(action, error) {
        fireEvent(this.pageRef, 'dcExceptionElement', {
            action: action, 
            error: error
        })
    }

}