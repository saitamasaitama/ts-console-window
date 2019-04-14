import * as Common from "./Common"
import { Color, Rect, Size } from "./includes";
import { exists } from "fs";



export function Write(src: string, s: Size, align: Common.Align = Common.Align.LEFT) {
  let x = 0;
  let y = 0;
  let c = 0;

  /*
    アラインに従って埋める
  */
  switch (align) {
    case Common.Align.LEFT:
      src = src.padEnd(s.width, " ");
    break;
    case Common.Align.RIGHT:
      src = src.padStart(s.width, " ");
    break;
    case Common.Align.CENTER:
      //左サイズ
      let left=s.width/2 + src.length/2;

      //右サイズ
      src =src.padStart(left, " ")
        .padEnd(s.width," ");
    break;

  }



  for (let i = 0;
    i < src.length &&
    i < s.width * s.height &&
    y < s.height; i++ , c++) {
    let size = charSize(src[i]);
    process.stdout.write(src[i]);

    if (1 < size) {
      x++;
    }

    x++;
    //折り返すか？
    if (s.width <= x) {
      MoveLeft(x);
      x = 0;
      MoveDown();
      y++;
      //
    }
    c++;
  }
}

export function MoveTo(x: number, y: number) {
  process.stdout.write(`\u001b[${y + 1};${x + 1}H`);
}
export function MoveLeft(step = 1) {
  process.stdout.write(`\u001b[${step}D`);
}
export function MoveRight(step = 1) {
  process.stdout.write(`\u001b[${step}C`);
}
export function MoveUp(step = 1) {
  process.stdout.write(`\u001b[${step}A`);
}
export function MoveDown(step = 1) {
  process.stdout.write(`\u001b[${step}B`);
}

export function SetColor(color: Common.Color) {
  process.stdout.write(`\u001b[3${color}m`);
}

export function SetBackgroundColor(color: Common.Color) {
  process.stdout.write(`\u001b[4${color}m`);
}

export function SetColorSet(
  fore: Common.Color = Color.BLACK,
  back: Common.Color = Color.WHITE,
  action: () => void) {

  SetColor(fore);
  SetBackgroundColor(back);

  action();

  ResetColor();
}

export function ResetColor() {
  //ESC[0m
  process.stdout.write(`\u001b[0m`);
}


export function Clear() {
  process.stdout.write(`\u001b[2J`);
}

export function Fill(c: string, rect: Common.Rect) {

  for (var y = 0; y < rect.height; y++) {
    for (var x = 0; x < rect.width >> 1; x++) {
      //
      MoveTo(x, y);
      process.stdout.write(c);
    }
  }


  for (var y = 0; y < rect.height; y++) {
    for (var x = rect.width >> 1; x < rect.width; x++) {
      //
      MoveTo(x, y);
      process.stdout.write(c);
    }
  }
}

export function Blit() {

}

/**
 * 1文字の長さを求める
 * @param c
 */
export function charSize(c: string) {
  return (!c.match(/[^\x01-\x7E]/) || !c.match(/[^\uFF65-\uFF9F]/))
    ? 1 : 2;
}

/**
 * 文字列のターミナル長さを求める
 * @param str
 */
export function strSize(str: string) {
  return str.split("").reduce(
    (carry, item: string) => carry + charSize(item)
    , 0);
}

