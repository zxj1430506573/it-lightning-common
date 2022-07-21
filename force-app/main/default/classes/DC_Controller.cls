public class DC_Controller {
    @AuraEnabled
    public static Map<String, Object> handle(Map<String, Object> params) {
        Map<String, Object> schema = (Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(params.get('schema')));
        String describeClassName = String.valueOf(schema.get('type'));
        //String handlerClassName = String.valueOf(schema.get('handler'));
        return new DC_Service(describeClassName).handleCommand(params).convertResultToMap();
    }
}
