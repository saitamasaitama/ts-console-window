
//import * as process from "process"
import * as tty from "tty"
//import * as Consoler from "./includes"

import * as Consoler from "./functions"
import * as Common from "./Common"
import { setInterval } from 'timers';
import { Screen } from "./Screen";


Consoler.Clear();

process.stdin.setRawMode(true);
//process.stdin.isRaw = true;

process.stdin.on("data", ($k) => {
  //if ($k === '\u0003') {
  if ($k == '\u0003') {
    process.exit();
  }
  process.stdout.write("k" + $k);
});




var $s = new Screen();

$s.Clear();

setTimeout(() => {
  process.exit(2);
}, 5000);
