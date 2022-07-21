import { LightningElement,api, track } from 'lwc';
import { registerListener } from 'c/dcPubsub';

export default class DcLoading extends LightningElement {
    @api actionTypes = ''
    @api excludeActionTypes = ''
    
    @track isLoading = false

    connectedCallback() {
        let registerName = 'dcLoadingElement'
        registerListener(registerName, (result) => {
            if (result.action && result.action.type
                && !this.excludeActionTypes.includes(result.action.type)) {
                this.isLoading = result.isLoading
            }

        }, this);        
    }
}