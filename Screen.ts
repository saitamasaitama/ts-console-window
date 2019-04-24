import * as Consoler from "./functions"
import { execSync } from 'child_process'
import { Size, Renderer, Color, Rect } from "./includes";
import { Window } from "./Window";
import { Align } from "./Common";

/**
  基本親window
*/
export class Screen extends Window
  {
  public color: Color = Color.YELLOW;
  public backgroundColor: Color = Color.BLACK;
  public children:Window[] = [];

  public constructor(){
    super({
      left:0,
      top:0,
      width: process.stdout.columns-2,
      height: process.stdout.rows-2
    });
  }

  public Start(){
    process.stdin.setEncoding('utf8');
    process.stdin.setRawMode(true);
    this.children = [];

    this.Refresh();
    process.stdin.on("data", ($k) => {
      if ($k == '\u0003') {
        process.exit();
      }
      this.Sendkey($k);
    });
  }

  public Sendkey(k){
    process.stdout.write(k);
    if(k==13){
      console.log("Enter");
    }
    //console.dir(k);
    if(this.children[0]){
      this.children[0].Sendkey(k);
    }
  }

  public RenderHeader() {
    this.MoveTo(-1,-1);
    Consoler.SetColorSet(Color.BLACK,Color.WHITE,
      ()=>Consoler.Write("HEADER",{width:this.size.width+2,height:1},Align.CENTER)
    );
  }
  public RenderBody() {
    
  }
  public RenderFooter() {

    Consoler.MoveTo(-1,this.bound.height);
    Consoler.SetColorSet(Color.WHITE,Color.BLUE,
      ()=>Consoler.Write(` / ${this.bound.width} :${this.bound.height} `,{width:this.size.width,height:1},Align.RIGHT)
    );
  }

  public Refresh() {
    super.Refresh();
    
    this.children.forEach(w=>{
      w.Refresh();
    });
  }
}
