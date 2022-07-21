import { LightningElement } from 'lwc';
import DcElement from 'c/dcElement';
export default class TestReduxPublishCallApex extends DcElement{

    connectedCallback(){
        super.connectedCallback();
        console.log('========')
        
    }
    
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

    subscribeTestPusSub({action,data}){
        console.log(action,data)
    }
    

}