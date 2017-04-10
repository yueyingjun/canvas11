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
// 障碍物
function hinder(canvas,cobj,hinderimg){
   this.canvas=canvas;
   this.cobj=cobj
   this.hinderimg=hinderimg;
   console.log(this.hinderimg[0])
   this.x=0;
   this.y=0;
   this.width=56;
   this.height=40;
   this.state=0;
}
hinder.prototype={
    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.drawImage(this.hinderimg[this.state],0,0,564,400,0,0,this.width,this.height);
        cobj.restore();
    },
    animate:function(speed){
        this.x-=speed;
    }
}

// 得分项



//粒子动画

function lizi(canvas,cobj,x,y){
    this.x=x;
    this.y=y;
    this.canvas=canvas;
    this.cobj=cobj;
    this.r=2+2*Math.random();
    this.speedx=8*Math.random()-4;
    this.speedy=8*Math.random()-4;
    this.color="red";
    this.speedl=0.3;
}
lizi.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        this.cobj.beginPath();
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    animate:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.r-=this.speedl;
    }

}

function xue(canvas,cobj,x,y){
    var arr=[];
    for(var i=0;i<20;i++){

        arr.push(new lizi(canvas,cobj,x,y));
    }

    var t=setInterval(function(){

        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].animate();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length<1){
            clearInterval(t);
        }

    },50)
}

function game(canvas, cobj, runimg, jumpimg,hinderimg) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.hinderimg=hinderimg;
    this.person = new person(canvas, cobj, runimg, jumpimg);
    this.speed=8;
    this.hinderArr=[];
    this.score=0;
    this.currentscore=0;
    this.life=3;
    this.step=2;


}

game.prototype = {
    play: function () {
        var that=this;
        var backpos=0;
        var personNum=0;
        var times=0;

        var randtime=Math.floor(3+6*Math.random())*1000;

        that.person.jump();
           setInterval(function(){
                times+=50;
               that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);

               if(times%randtime==0) {
                   randtime=Math.floor(3+6*Math.random())*1000;
                   var hidnderObj=new hinder(that.canvas, that.cobj, that.hinderimg);
                   hidnderObj.state=Math.floor(Math.random()*that.hinderimg.length);
                   hidnderObj.y=that.canvas.height-hidnderObj.height;
                   hidnderObj.x=that.canvas.width;
                   that.hinderArr.push(hidnderObj);

                if(that.hinderArr.length>5){
                    that.hinderArr.shift();
                }
               }

               for(var i=0;i<that.hinderArr.length;i++){
                   that.hinderArr[i].draw();
                   that.hinderArr[i].animate(that.speed);


                   if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){

                       xue(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
                       if(!that.hinderArr[i].hits){

                           that.life--;
                           if(that.life<0){

                               alert("game over!");
                               location.reload();
                           }
                           that.hinderArr[i].hits="hits";
                       }


                   }


                   if(that.hinderArr[i].x+that.hinderArr[i].width<that.person.x&&!that.hinderArr[i].hits){

                       if(!that.hinderArr[i].score) {
                           ++that.score;
                           ++that.currentscore;
                           if(that.currentscore%that.step==0){
                               that.step=that.currentscore*2;
                               that.currentscore=0;
                               that.speed+=1;

                           }



                           that.hinderArr[i].score="true"
                       }
                   }
               }
               personNum++
               that.person.draw();
               that.person.animate(personNum,that.speed);

               backpos-=that.speed;

               that.canvas.style.backgroundPositionX=backpos+"px";
           },50)

    }
}