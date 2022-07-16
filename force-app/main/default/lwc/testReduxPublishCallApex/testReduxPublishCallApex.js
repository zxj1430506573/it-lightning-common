import { LightningElement } from 'lwc';
import DcElement from 'c/dcElement';
export default class TestReduxPublishCallApex extends DcElement(LightningElement) {
    handleClick(event){
        console.log('===>')

        this.dispatchAction({
           action: {
                type: "TestPusSub",
                payload:{
                    id: "123",
                    age: "18"
                }
           } 
        })
        
    }
}