//人物对象
function person(canvas, cobj, runimg, jumpimg) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.runimg = runimg;
    this.jumpimg = jumpimg;
    this.x = 0;
    this.y = 0;
    this.width = 83;
    this.height = 118;
    this.status = "runimg";
    this.state = 0;

}
person.prototype = {
    draw: function () {
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height);
        cobj.restore();
    },
    animate: function (num,speed) {
           if(this.status=="runimg") {
               this.state = num % 7;
           }else{
               this.state=0;
           }
           this.x+=speed;
           if(this.x>this.canvas.width/3){
               this.x=this.canvas.width/3
           }

    },
    jump: function () {
        var that=this;
        var flag=true;
        touch.on(this.canvas,"touchstart",function(){

            if(!flag){
                return;
            }
            flag=false;
            var inita=0;
            var speeda=10;
            var currenty=that.y;
            var r=100;
            that.status="jumpimg";
            that.state=0;
            var t=setInterval(function(){
                inita+=speeda;
                if(inita>=180){
                    that.status="runimg"
                    clearInterval(t);
                    that.y=currenty;
                    flag=true;
                }else{

                    that.y=currenty- Math.sin(inita*Math.PI/180)*r;
                }

            },50)



        })
    }
}

function game(canvas, cobj, runimg, jumpimg) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.person = new person(canvas, cobj, runimg, jumpimg);
    this.speed=5;

}






game.prototype = {
    play: function () {
        var that=this;
        var backpos=0;
        var personNum=0;
        that.person.jump();
           setInterval(function(){
               that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
               personNum++
               that.person.draw();
               that.person.animate(personNum,that.speed);

               backpos-=that.speed;

               that.canvas.style.backgroundPositionX=backpos+"px";
           },50)

    }
}