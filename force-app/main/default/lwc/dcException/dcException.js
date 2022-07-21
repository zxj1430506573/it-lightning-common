import { LightningElement,api, track } from 'lwc';
import { registerListener } from 'c/dcPubsub';

export default class DcException extends LightningElement {

    @api excludeActionTypes = ''

    @track toastTitle
    @track toastMessage

    connectedCallback() {
        let registerName = 'dcExceptionElement'
        registerListener(registerName, (result) => {
            if (result.action && result.error.length > 0 
                && !this.excludeActionTypes.includes(result.action.type)) {
                if (result.error.length == 1) {
                    let error = result.error[0]
                    this.toastTitle = error.name
                    this.toastMessage = error.message
                } else {
                    this.toastTitle = '发生多个错误'
                    let message = ''
                    for (let err of result.error) {
                        message = message + err.message + '<br/>'
                    }
                    this.toastMessage = message
                }
                this.template.querySelector('c-env-toast').showToast();
            }
        }, this);        
    }
}