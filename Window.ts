import * as Consoler from "./functions"
import { Size, Renderer, Color,Rect } from "./includes";
import { Align } from "./Common";
import * as fs from "fs";

export abstract class Window implements Renderer{

  public parent:Window;
  public color: Color = Color.WHITE;
  public backgroundColor: Color = Color.BLACK;
  public title: string = "test";

  public contents:string;
  public size: Size;
  public bound:Rect;

  protected MoveTo(x,y){
    Consoler.MoveTo(
        this.bound.left+x,
        this.bound.top+y
        );
  }
  protected Write(src){
    //範囲指定書き込みにする
    Consoler.Write(src);
  }
  public Rect(r:Rect):Rect=>{
    left:this.bound.left+r.left,
    top:this.bound.top+r.top,
    width:r.width,
    height:r.width
  };
  

  public abstract Sendkey(k);
  public abstract RenderBody();
  public abstract Start();

  public Clear() {
    //Size範囲を消去する
    Consoler.SetColorSet(Color.WHITE,Color.BLACK,
      ()=>Consoler.Fill(' ',{
        left:this.bound.left,
        top:this.bound.top+1,
        width:this.bound.width,
        height:this.bound.height-1
      })
    );

  }
  public Refresh() {
    this.Clear();
    this.RenderHeader();
    this.RenderFooter();
    this.RenderBody();
  }

  public constructor(r:Rect) {
    this.bound = {
       width: r.width,
       height: r.height,
       left:r.left,
       top:r.top
    };

    this.size = {
      width:this.bound.width,
      height:this.bound.height
    };
    this.Start();
  }
  public RenderFooter() {
    this.MoveTo(0,this.size.height-1);
    Consoler.SetColorSet(Color.WHITE,Color.BLUE,
        ()=>Consoler.Write("FOOT",{width:this.size.width,height:1},Align.RIGHT)
        );
  }
  public RenderHeader() {
    //枠を描く
    //
    this.MoveTo(0,0);
    Consoler.SetColorSet(Color.WHITE,Color.BLUE,
        ()=>Consoler.Write("WINDOW",{width:this.size.width,height:1},Align.CENTER)
    );

    //トップ
    this.MoveTo(-1,0);
    process.stdout.write("+");
    this.MoveTo(this.size.width,0);
    process.stdout.write("+");

    //サイド
    for(var y =1;y<this.size.height;y++){

      this.MoveTo(-1,y);
      process.stdout.write("|");
      this.MoveTo(this.size.width,y);
      process.stdout.write("|");

    }
    //ボトム
    this.MoveTo(-1,this.size.height-1);
    process.stdout.write("+");
    this.MoveTo(this.size.width,this.size.height-1);
    process.stdout.write("+");
  }


}

interface SingleList{
  Up(); 
  Down(); 
  Enter(); //→など
  Back(); //←など　（もしくは最上部でEnter)
}

export class SimpleListWindow extends Window implements Renderer,SingleList {
  private index=0;

  protected items:string[];

  public RenderBody() {
    this.items.forEach((item,index)=>{
      this.MoveTo(2,index+1);
      process.stdout.write(item);      
    });

  }
  public Start(){
    
    this.items=[];

    var list=fs.readdirSync("./");
    list.forEach(item=>{
      this.items.push(item);
    });
    Consoler.ResetColor();
    Consoler.MoveTo(1,1);
  }

  public Sendkey(k){
    switch(k){
      case "\u001B\u005B\u0041": this.Up();
        break;
      case "\u001B\u005B\u0043":this.Enter();
        break;
      case "\u001B\u005B\u0042":this.Down();
        break;
      case "\u001B\u005B\u0044":this.Back();
        break;
      default:
      break;
    }
  }

  public Up(){
    if(this.index-1 <= 0){
      return;
    }
    this.index--;

    console.log("Up:"+this.index);
  }
  public Down(){
    if(this.items.length<= this.index+1 ){
      return;
    }
    this.index++;
    console.log("Down:"+this.index);
  }
  public Back(){
    console.log("Back:"+this.index);
  }
  public Enter(){
    console.log("Enter:"+this.index);
    
  }
}

