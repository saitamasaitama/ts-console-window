import { execSync } from 'child_process'
import * as tty from "tty"
//import * as Consoler from "./includes"

import * as Consoler from "./functions"
import * as Common from "./Common"
import { setInterval } from 'timers';
import { Screen } from "./Screen";

var width: number = parseInt(execSync("tput cols").toString());
var height: number = parseInt(execSync("tput lines").toString());

Consoler.Clear();
process.stdin.setRawMode(true);
process.stdin.on("data", ($k) => {
  //if ($k === '\u0003') {
  if ($k == '\u0003') {
    process.exit();
  }
  process.stdout.write("k" + $k);
});


Consoler.MoveTo(0, height);
Consoler.MoveTo(0, 0);


var $s = new Screen();

$s.Clear();

setTimeout(() => {
  process.exit(2);
}, 5000);
