import { delayTimeout, cleanCxt } from '../util/fn';
import { CXT_BG, WHEEL_CHANGE_FREQUENT, CXT_H } from '../global/const';
import { inputParam } from '../global/var';
import res from '../data/assets';

const MIN_Y = 285;
const MAX_Y = 345;
const PLAYER_IMG = res.img.player;
const changeWheel: delayOption = {
  count: WHEEL_CHANGE_FREQUENT,
  amount: WHEEL_CHANGE_FREQUENT
};

let wheelPic = 0;
let screenTopPosition = CXT_H;
let indicatorPosition = MIN_Y;

export default class {
  private touchTop: boolean;

  constructor() {
    this.touchTop = false;
  }

  private drawAfterTouchTop() {
    delayTimeout(changeWheel, () => (wheelPic = (+!wheelPic) * 32));
    CXT_BG.clearRect(140, 260, 32, 120);
    CXT_BG.drawImage(PLAYER_IMG, 0, 64 + wheelPic, 32, 32, 140, indicatorPosition, 32, 32);
    // doAfterPressKey(operate);
  }

  private drawBeforeTouchTop() {
    // 如果按下了H键，则直接运动到顶部
    inputParam['H'] ? screenTopPosition = 75 : screenTopPosition -= 3;

    cleanCxt('bg');
    CXT_BG.save();
    CXT_BG.fillStyle = 'white';
    CXT_BG.fillText('I-         00   HI-20000', 70, screenTopPosition);
    CXT_BG.fillText('NORMAL MODE', 190, screenTopPosition + 220);
    CXT_BG.fillText('CRAZY MODE', 190, screenTopPosition + 250);
    CXT_BG.fillText('CONSTRUCTION', 190, screenTopPosition + 280);
    CXT_BG.drawImage(res.img.ui, 0, 0, 376, 160, 70, screenTopPosition + 25, 376, 160);
    CXT_BG.restore();

    if (screenTopPosition <= 75) {
      this.touchTop = true;
      inputParam.isPressed = false;
    }
  }

  public draw() {
    this.touchTop ? this.drawAfterTouchTop() : this.drawBeforeTouchTop();
  }
}
