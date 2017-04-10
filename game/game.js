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
           this.state=num%7;
           this.x+=speed;
           if(this.x>this.canvas.width/3){
               this.x=this.canvas.width/3
           }

    },
    jump: function () {

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