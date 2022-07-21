public virtual class DC_Command {

    public virtual Boolean autoSaveResult() {
        return true;
    }

    public virtual DC_Result handle(Map<String, Object> params) {
        return null;
    }
}
