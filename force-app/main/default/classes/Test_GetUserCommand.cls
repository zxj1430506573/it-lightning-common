public class Test_GetUserCommand extends DC_Command {
    public override DC_Result handle(Map<String, Object> params) {
        DC_Result result = new DC_Result();
        result.data = [select Id,Name,Email FROM User];
        return result;
    }
}
