import * as Common from "./Common"
import { Color } from "./includes";


export function MoveTo(x: number, y: number) {
  process.stdout.write(`\u001b[${y + 1};${x + 1}H`);
}

export function SetColor(color: Common.Color) {
  process.stdout.write(`\u001b[3${color}m`);
}

export function SetBackgroundColor(color: Common.Color) {
  process.stdout.write(`\u001b[4${color}m`);
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

  SetColor(Color.GREEN);
  SetBackgroundColor(Color.RED);

  for (var y = 0; y < rect.height; y++) {
    for (var x = rect.width >> 1; x < rect.width; x++) {
      //
      MoveTo(x, y);
      process.stdout.write(c);
    }
  }


  process.stdout.write(`[${rect.width}:${rect.height}]`);
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

