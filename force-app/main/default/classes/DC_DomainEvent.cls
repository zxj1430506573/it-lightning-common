public virtual class DC_DomainEvent {
    public virtual Map<String, Object> getDescribe() {
        Map<String, Object> result = new Map<String, Object>{
            'name' => String.valueOf(this).split(':')[0],
            'data' => this
        };
        return result;
	}
}
