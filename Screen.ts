import * as Consoler from "./functions"
import { execSync } from 'child_process'
import { Size, Renderer, Color, Rect } from "./includes";
import { Align } from "./Common";


export class Screen extends Array<string> implements Renderer {
  public bound: Rect;
  public size: Size;


  public title: string = "test";
  public color: Color = Color.YELLOW;
  public backgroundColor: Color = Color.GREEN;


  RenderHeader() {
    Consoler.MoveTo(0,0);
    Consoler.SetColorSet(Color.BLACK,Color.WHITE,
      ()=>Consoler.Write("FOOTER",{width:this.size.width,height:1},Align.CENTER)
    );
  }
  RenderBody() {
//    throw new Error("Method not implemented.");
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



}
