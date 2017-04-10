function person(canvas,cobj,runimg,jumpImg){
    this.x=200;
    this.y=420;
    this.canvas=canvas;
    this.cobj=cobj;
    this.runImg=runimg;
    this.jumpImg=jumpImg;
    this.width=83;
    this.height=118;
    this.status="runImg";
    this.state=0;
}
person.prototype={

    draw:function(){
        var cobj=this.cobj;
        cobj.save();
        cobj.translate(this.x,this.y);
        cobj.drawImage(this[this.status][this.state],0,0,827,1181,0,0,this.width,this.height)
        cobj.restore();
    }
}



function game(canvas,cobj,runimg,jumpImg){
    this.canvas=canvas;
    this.cobj=cobj;
    this.speedx=5;
    this.person=new person(canvas,cobj,runimg,jumpImg);
}
game.prototype={


    play:function(){
        var backNum=0;
        var that=this;
        var num=0;

        setInterval(function(){
            backNum-=that.speedx;
            num++;
            that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
            that.person.state=num%7;
            that.person.draw();
            that.canvas.style.backgroundPositionX=backNum+"px";

        },50)
    }
}