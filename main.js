//Array取差集
function intersect(arr1,arr2){
    var retArr = [];
    for(var i = 0; i < arr1.length; i++){
        var flag = false;
        for(var j = 0; j < arr2.length; j++){
            if(arr1[i] == arr2[j]){
                flag = true;
            }
        }
        if(flag == false){
            retArr.push(arr1[i]);
        }
    }
    return retArr;
}

var shudu;
$(function(){
    var click_ele;
    //获取点击的格子
    $('td').click(function(){
        $(click_ele).css('box-shadow','none');
        if(click_ele != this){
            click_ele = this;
            $(click_ele).css('box-shadow','0 0 20px #333');
        }else{
            click_ele = null;
        }
    });
    //按键按下时给格子赋值
    $(document).keypress(function(e){
        var num = e.which - 48;
        if(num < 1 || num > 9)
            return;
        $(click_ele).html(num);
    });
    //点击开始计算的时候
    $('#go').click(function(){
        var table = document.querySelector('table');
        shudu = new Shudu(table);
    });
    /*测试数据
    var nodes = [
        [0,0,0,6,9,0,0,8,1],
        [3,1,9,8,0,0,0,4,2],
        [0,5,0,0,1,0,0,9,3],
        [6,3,5,0,0,0,0,7,0],
        [0,7,2,0,0,0,0,0,0],
        [0,8,0,7,0,0,0,5,4],
        [5,0,3,2,0,8,0,1,6],
        [1,0,0,0,4,0,0,2,7],
        [0,2,4,9,6,0,0,0,0],
    ];
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            if(nodes[i][j] > 0){
               $('table').find('tr').eq(i).find('td').eq(j).html(nodes[i][j]); 
            }
        }
    }
    */
});

function Shudu(table){
    this.table = table;
    this.data = new Object();
    this.init();
    var zeroNum = 0;
    var i = 0;
    while(this.calcu()){};
}
//初始化
Shudu.prototype.init = function(){
    var self = this;
    $(self.table).find('tr').each(function(i,e){
        var arr = [];
        $(e).find('td').each(function(ii,ee){
            arr.push($(ee).html() == ""?0:parseInt($(ee).html()));
            self.data[i] = arr;
        });
    });
}
//计算，如果填充成功，返回true，否则返回false，返回false说明计算结束，如果仍有空格未填，则说明此数独不能找到明确解
Shudu.prototype.calcu = function(){
    var self = this;
    var allNum = [1,2,3,4,5,6,7,8,9];
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            var nodeNo = self.data[i][j];
            if(nodeNo == 0){
                var xAll = self.xdirectionAll(i,j);
                var yAll = self.ydirectionAll(i,j);
                var rAll = self.RectAll(i,j);
                var ret = intersect(allNum,xAll);
                    ret = intersect(ret,yAll);
                    ret = intersect(ret,rAll);
                if(ret.length == 1){
                    var trueNum = ret[0];
                    self.data[i][j] = trueNum;
                    self.ShowNum(i,j,trueNum);
                    return true;
                }
            }
        }
    }
    return false;
}
//求X方向数集
Shudu.prototype.xdirectionAll = function(x,y){
    var self = this;
    var arr = [];
    for(var j = 0; j < 9; j++){
        var nodeNo = self.data[x][j];
        if(nodeNo > 0 && nodeNo < 10){
            arr.push(nodeNo);
        }
    }
    return arr;
}
//求Y方向数集
Shudu.prototype.ydirectionAll = function(x,y){
    var self = this;
    var arr = [];
    for(var j = 0; j < 9; j++){
        var nodeNo = self.data[j][y];
        if(nodeNo > 0 && nodeNo < 10){
            arr.push(nodeNo);
        }
    }
    return arr;
}
//求方格数集
Shudu.prototype.RectAll = function(x,y){
    var self = this;
    var xModRet = x % 3;
    var yModRet = y % 3;
    var startX = x - xModRet;
    var startY = y - yModRet;
    var arr = [];
    for(var i = startX; i < startX+3; i++){
        for(var j = startY; j < startY+3; j++){
            var nodeNo = self.data[i][j];
            if(nodeNo > 0 && nodeNo < 10){
                arr.push(nodeNo);
            }
        }
    }
    return arr;
}

//设置某格值的显示
Shudu.prototype.ShowNum = function(x,y,num){
    var self = this;
    $(self.table).find('tr').eq(x).find('td').eq(y).html(num);
}