public class DC_Result {
    public List<DC_Exception> domainExceptions = new List<DC_Exception>();
    public List<DC_DomainEvent> events = new List<DC_DomainEvent>();
    public List<Object> data;
    // public List<DC_WF_EdgeReturn> executedEdges = new List<DC_WF_EdgeReturn>();
    public String wfGroupId;

    public Map<String, Object> convertResultToMap() {
        Map<String, Object> res = new Map<String, Object>();
        List<Map<String, Object>> eventVOs = new List<Map<String, Object>>();
        for (DC_DomainEvent dEvent : events) {
            eventVOs.add(dEvent.getDescribe());
        }
        
        List<Map<String, Object>> errors = new List<Map<String, Object>>();
        for (DC_Exception ex : domainExceptions) {
            errors.add(ex.getDescribe());
        }
        res.put('error', JSON.deserializeUntyped(JSON.serialize(errors)));
        res.put('data', data);
        res.put('events', JSON.deserializeUntyped(JSON.serialize(eventVOs)));
        return res;
    }
}
