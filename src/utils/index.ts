import { screen } from 'src/constant'
import { ctx, ICtx } from 'src/global'

export function clearCanvas(cleanType?: Array<keyof ICtx>) {
  const cleanArr = !cleanType ? Object.keys(ctx) : cleanType

  cleanArr.forEach(key => {
    (ctx[key] as CanvasRenderingContext2D).clearRect(0, 0, screen.width, screen.height)
  })
}

export function delayLoop(count: number) {
  let curCount = 0

  return function (cb: Function) {
    if (curCount >= count) {
      curCount = 0
      cb()
    } else {
      curCount += 1
    }
  }
}