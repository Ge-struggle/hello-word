import java.math.BigDecimal;

public class Test {

    BigDecimal bigDecimal= new BigDecimal("123.123");

    Boolean testinstanceof(Object obj){
        return obj instanceof Integer;
    }

    public static void main(String[] args) {
        Test t=new Test();
        System.out.println(t.testinstanceof(t.bigDecimal));
    }
}
