import { reactive, toRaw, toRefs } from 'vue'
import { useDrag } from './use-drag'
import { addEvent } from './doc-event'

const PX_HIDDEN = -10000
const PX_ADSORB = 4
const { dragging, current, dropResult } = useDrag()
const state = reactive({
  lineHorizontal: [PX_HIDDEN, PX_HIDDEN, PX_HIDDEN],
  lineVertical: [PX_HIDDEN, PX_HIDDEN, PX_HIDDEN]
})

let dropContainerItemsPositions: Array<{
  id: number,
  horizontal: number[],
  vertical: number[]
}> = []
function handleMousedown () {
  if (!dragging.value) {
    return
  }
  const cur = current!.value
  const data = dropResult.value.filter(x => x !== cur)
  data.forEach(item => {
    dropContainerItemsPositions.push({
      id: item.id,
      horizontal: [
        item.y,
        item.y + item.height / 2,
        item.y + item.height
      ],
      vertical: [
        item.x,
        item.x + item.width / 2,
        item.x + item.width
      ]
    })
  })
}

function handleMousemove () {
  if (!dragging.value || !current!.value) {
    return
  }
  const cur = current!.value
  const curHorizontal = [
    cur.y,
    cur.y + cur.height / 2,
    cur.y + cur.height
  ]
  const curVertical = [
    cur.x,
    cur.x + cur.width / 2,
    cur.x + cur.width
  ]

  const calPosition = (type: 1 | 2) => {
    const curState = type === 1 ? curHorizontal : curVertical
    return curState.map((px, i) => {
      let value
      for (const { horizontal, vertical } of dropContainerItemsPositions) {
        /**
         * 与兄弟节点匹配
         */
        const siblingState = type === 1 ? horizontal : vertical
        value = siblingState.find(siblingPx => px <= siblingPx + PX_ADSORB && px >= siblingPx - PX_ADSORB)
        /**
         * 自动吸附
         */
        const { width, height } = current!.value!
        const dimension = type === 1 ? height : width
        const positionKey = type === 1 ? 'y' : 'x'
        if (value) {
          let position
          if (i === 0) {
            position = value
          } else if (i === 1) {
            position = value - dimension / 2
          } else {
            position = value - dimension
          }
          current!.value![positionKey] = position
          break
        }
      }
      return value || PX_HIDDEN
    })
  }

  state.lineHorizontal = calPosition(1)
  state.lineVertical = calPosition(2)
}

function handleMouseup () {
  dropContainerItemsPositions = []
}

export function useReferenceLine () {
  addEvent({
    id: 'reference-line',
    mousedown: handleMousedown,
    mousemove: handleMousemove,
    mouseup: handleMouseup
  })

  return {
    ...toRefs(state)
  }
}
