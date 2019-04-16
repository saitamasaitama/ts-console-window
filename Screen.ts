import * as Consoler from "./functions"
import { execSync } from 'child_process'
import { Size, Renderer, Color, Rect } from "./includes";
import { Window } from "./Window";
import { Align } from "./Common";


export class Screen extends Array<Window> implements Renderer {
  public bound: Rect;
  public size: Size;

  public title: string = "test";
  public color: Color = Color.YELLOW;
  public backgroundColor: Color = Color.BLACK;

  public Sendkey(k){
    process.stdout.write(k);
    if(k==13){
      console.log("Enter");
    }
    //console.dir(k);
    this[0].Sendkey(k);
  }

  RenderHeader() {
    Consoler.MoveTo(0,0);
    Consoler.SetColorSet(Color.BLACK,Color.WHITE,
      ()=>Consoler.Write("HEADER",{width:this.size.width,height:1},Align.CENTER)
    );
  }
  RenderBody() {
  }
  RenderFooter() {

    Consoler.MoveTo(0,this.bound.height-1);
    Consoler.SetColorSet(Color.WHITE,Color.BLUE,
      ()=>Consoler.Write("FOOTER",{width:this.size.width,height:1},Align.RIGHT)
    );
  }

  public Clear() {
    //Size範囲を消去する
    Consoler.SetColorSet(this.color,this.backgroundColor,()=>{
      Consoler.Fill(" ",{
        left:0,
        top:1,
        width:this.bound.width,
        height:this.bound.height
      });

    });
    Consoler.ResetColor();
  }
  public Refresh() {
    this.Clear();
    this.RenderHeader();
    this.RenderBody();
    this.RenderFooter();
    this.forEach(w=>{
      w.Refresh();
    });
  }


  public constructor(
  ) {
    super();

    var $width: number = process.stdout.columns;
    var $height: number = process.stdout.rows;

    this.size = {
      width: $width,
      height: $height
    };
    this.bound = {
      left: 0,
      top: 0,
      width: $width,
      height: $height

    }
  }
  public CreateSubWindow():Window{
    let w = new Window({
        left:this.bound.left+1,
        top:this.bound.top+1,
        width:this.bound.width >> 1,
        height:(this.bound.height -2)>>1,
      }
    );

    this.push(w);
    return w;
  }
}
