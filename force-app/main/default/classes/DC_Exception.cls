public virtual class DC_Exception extends Exception{
    public virtual Map<String, Object> getDescribe() {
        Map<String, Object> result = new Map<String, Object>{
                'name' => String.valueOf(this).split(':')[0]
                    };
        String message = JSON.serialize(this);
        if (message == '{}') {
            result.put('message', this.getMessage());
        } else {
            result.put('message', message);        
        }

        return result;
	}
}
