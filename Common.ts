



export interface Point {
  x: number,
  y: number
}
export interface Size {
  width: number,
  height: number
}

export interface Rect {
  left: number,
  top: number,
  width: number,
  height: number,
}


export interface Renderer {
  RenderHeader(),
  RenderBody(),
  RenderFooter(),
  Clear(),
  Refresh()
}

export interface KeyBehaviour {

  OnSendKey(k: string);

}

export enum Color {
  /**
\e[30m	\e[40m	黒
\e[31m	\e[41m	赤
\e[32m	\e[42m	緑
\e[33m	\e[43m	黄色
\e[34m	\e[44m	青
\e[35m	\e[45m	マゼンダ
\e[36m	\e[46m	シアン
\e[37m	\e[47m	白
   * */
  BLACK = 0,
  RED = 1,
  GREEN = 2,
  YELLOW = 3,
  BLUE = 4,
  PURPLE = 5,
  CYAN = 6,
  WHITE = 7
}

export enum Align{
  LEFT,
  RIGHT,
  CENTER
}
