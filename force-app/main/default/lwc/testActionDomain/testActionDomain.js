import DcDomain from "c/dcDomain";
import { api } from "lwc";
import callCommandHandle from "@salesforce/apex/DC_Controller.handle";

export default class TestActionDomain extends DcDomain {

    @api
    async handleTestPusSub(action) {
        let params = {
            schema: { type: "Test_GetUserCommand" },
            ...action.payload
        };
        let result = await callCommandHandle({ params: params });
        return {
            action: action,
            data: result.data
        };
    }

}