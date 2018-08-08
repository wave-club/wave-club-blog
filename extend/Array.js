/**
 * @link  https://github.com/976500133/FETopic/issues/68
 * @descrption 随机数 洗牌 Fisher–Yates shuffle
 * **使用方式 [1,2,3,4,5,6,7,8].shuffle()
 * **返回值 [4, 6, 3, 2, 5, 1, 7, 8] // 每次结果都是随机的
 **/
Array.prototype.shuffle = function () {
    var input = this

    for (let i = input.length - 1; i >= 0; i--) {

        let randomIndex = Math.floor(Math.random() * (i + 1))
        let itemAtIndex = input[randomIndex]

        input[randomIndex] = input[i]
        input[i] = itemAtIndex
    }
    return input
}