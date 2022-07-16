import DcDomain from "c/dcDomain";
import { api } from "lwc";

export default class TestActionDomain extends DcDomain {

    @api
    async handleTestPusSub(action) {
        // let params = {
        //     schema: { type: "TC2_GetProjectCommand" },
        //     ...action.payload
        // };
        // let result = await callCommandHandle({ params: params });
        return {
            action: action
        };
    }

}