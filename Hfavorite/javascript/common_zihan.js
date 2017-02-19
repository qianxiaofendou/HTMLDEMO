/**
 * 检查数组元素是否有重复
 * 有重复返回true
 * @param arr 数组
 */
function checkArrayItemsIsDuplicate(arr) {
    var map = {}, i, size;

    for (i = 0, size = arr.length; i < size; i++){
        if (map[arr[i]]){
            return true;
        }
        map[arr[i]] = true;
    }

    return false;
}
//var cc = [1,2,5,6,7,8,0,9];
//alert(checkArrayItemsIsDuplicate(cc));