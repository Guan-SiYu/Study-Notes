import UIKit
//原始全局变量写法
func stepAdd0(step0:Int,stepResult0:inout Int)->Int{
    stepResult0 += step0
    return stepResult0
}
var start = 0
stepAdd0(step0: 2, stepResult0: &start)
stepAdd0(step0: 2, stepResult0: &start)
stepAdd0(step0: 2, stepResult0: &start)
start
start
start
//使用闭包改进
func swapFunc(step:Int,startValue:Int)->()->Int{
    var stepResult = startValue
    func stepAdd()->Int{
        stepResult += step
        return stepResult
    }
    return stepAdd
}

var stepOf5 = swapFunc(step: 5,startValue: 5)
stepOf5()
stepOf5()

var stepOf6 = swapFunc(step: 6,startValue: 0)
stepOf6()
stepOf6()

let alsoStepOf6 = stepOf6
alsoStepOf6()
//stepResult += 4 报错提示stepResult未定义，说明闭包不会收到全局变量的污染
