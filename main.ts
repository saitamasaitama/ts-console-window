
//import * as process from "process"
import * as tty from "tty"
//import * as Consoler from "./includes"

import * as Consoler from "./functions"
import * as Common from "./Common"
import { setInterval } from 'timers';
import { Screen } from "./Screen";


Consoler.Clear();

/*
windowsの時は
echo 'exec winpty bash' >> ~/.bash_profile */
process.stdin.setEncoding('utf8');
process.stdin.setRawMode(true);


var $s = new Screen();
$s.CreateSubWindow();

$s.Refresh();
process.stdin.on("data", ($k) => {
  if ($k == '\u0003') {
    process.exit();
  }
  $s.Sendkey($k);
});


setTimeout(() => {
  process.exit(2);
},10000);
