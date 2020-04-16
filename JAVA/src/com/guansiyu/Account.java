package com.guansiyu;

public class Account {
    private float balance;//余额 公开和私有都是访问修饰符

    //但是如果我们真的需要修改余额呢？ 可以新建一个设置余额的成员方法
    //存钱
    public void cunqian(float amount){
        if(amount>0)
        balance+=amount;
    }
    //花钱
    public void huaqian(float amount){
        if(amount>0)
            balance-=amount;
    }
    //读取余额的方法
    public float getBalance(){
        return balance;
    }//这就是封装原则的实际操作 封装就是在一个类中绑定字段和操作字段的方法 并在类的外部隐藏字段的数据
}
