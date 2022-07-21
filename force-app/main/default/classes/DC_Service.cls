public  class DC_Service {
    private String commandClassName;

    public DC_Service(String commandClassName) {
        this.commandClassName = commandClassName;
    }


    public DC_Result handleCommand(Map<String, Object> params) {
        return handleCommand(params, true);
    }

    public DC_Result handleCommand(Map<String, Object> params, Boolean autoSaveLog) {
        DC_Result result = new DC_Result();
        Type commandTpye = Type.forName(commandClassName);
        DC_Command command = (DC_Command)commandTpye.newInstance();
        result = command.handle(params);
        if (command.autoSaveResult() && autoSaveLog) {
            //insert buildCommandLog(commandClassName, result);     
            // DC_CommandLog__c log = buildCommandLog(commandClassName, result);  
            // DC_CommandLogEvent__e event = new DC_CommandLogEvent__e();
            // event.Name__c = log.Name;
            // event.DomainEventData__c = log.DomainEventData__c;
            // event.DomainExceptionData__c = log.DomainExceptionData__c;
            // EventBus.publish(event);
        } 
        return result;
    }

}
