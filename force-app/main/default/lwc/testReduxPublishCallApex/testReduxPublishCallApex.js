import { LightningElement } from 'lwc';
import DcElement from 'c/dcElement';
// TEST empApi
import {
    subscribe,
    unsubscribe,
    onError,
    setDebugFlag,
    isEmpEnabled,
} from 'lightning/empApi';
export default class TestReduxPublishCallApex extends DcElement{

    connectedCallback(){
        super.connectedCallback();
        console.log('========')

        // Register error listener
        this.registerErrorListener();
        
    }
    /**test empApi  start */
    channelName = '/event/Test__e';
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;

    subscription = {};

    // Tracks changes to channelName text field
    handleChannelName(event) {
        this.channelName = event.target.value;
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = function (response) {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
            this.toggleSubscribeButton(true);
        });
    }

    // Handles unsubscribe button click
    handleUnsubscribe() {
        this.toggleSubscribeButton(false);

        // Invoke unsubscribe method of empApi
        unsubscribe(this.subscription, (response) => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
            // Response is true for successful unsubscribe
        });
    }

    toggleSubscribeButton(enableSubscribe) {
        this.isSubscribeDisabled = enableSubscribe;
        this.isUnsubscribeDisabled = !enableSubscribe;
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }


     /**test empApi  start */


    /**
     * 测试 pubsub and call apex start
     * @param {*} event 
     */
    handleClick(event){
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
    /** pubsub and call apex  end */

}