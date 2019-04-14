import * as Consoler from "./functions"
import { execSync } from 'child_process'
import { Size, Renderer, Color } from "./includes";

//基本フルスクリーン



export class Window implements Renderer {
  RenderHeader() {
    throw new Error("Method not implemented.");
  }
  RenderBody() {
    throw new Error("Method not implemented.");
  }
  RenderFooter() {
    throw new Error("Method not implemented.");
  }

  public Clear() {
    //Size範囲を消去する
    Consoler.SetColor(this.color);
    Consoler.SetBackgroundColor(this.backgroundColor);




  }
  public Refresh() {

  }

  public size: Size;

  public title: string = "test";
  public color: Color = Color.YELLOW;
  public backgroundColor: Color = Color.BLUE;

  public constructor(
  ) {
    var $width: number = parseInt(execSync("tput cols").toString());
    var $height: number = parseInt(execSync("tput lines").toString());

    this.size = {
      width: $width,
      height: $height
    };
  }
}

