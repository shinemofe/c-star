import { reactive, toRaw, toRefs } from 'vue'
import { useDrag } from './use-drag'
import { addEvent } from './doc-event'

const PX_HIDDEN = -10000
const PX_ADSORB = 4
const { dragging, current, dropResult, draggingEl, dropContainerEl, moveX, moveY, setDragState, setItemPosition } = useDrag()
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
  const { id } = draggingEl.value.dataset
  const cur = current!.value
  const data = id ? dropResult.value.filter(x => x !== cur) : dropResult.value
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

const calPosition = (curState, type: 1 | 2, curPosition, adsorbCallback) => {
  // const curState = type === 1 ? curHorizontal : curVertical
  return curPosition.map((px, i) => {
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
      const { width, height } = curState
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
        // current!.value![positionKey] = position
        adsorbCallback(positionKey, position)
        break
      }
    }
    return value || PX_HIDDEN
  })
}
function handleMousemove () {
  if (!dragging.value) {
    return
  }
  let cur
  const { id, width, height } = draggingEl.value.dataset
  if (id) {
    cur = current!.value
  } else {
    const { x, y } = setItemPosition(moveX.value, moveY.value)
    cur = {
      x,
      y,
      width: Number(width),
      height: Number(height)
    }
  }
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
  const adsorbCallback = (positionKey, position) => {
    if (id) {
      current!.value![positionKey] = position
    } else {
      const rect = dropContainerEl.value.getBoundingClientRect()
      setDragState({
        [positionKey === 'x' ? 'moveX' : 'moveY']: position + rect[positionKey]
      })
    }
  }
  state.lineHorizontal = calPosition(cur, 1, curHorizontal, adsorbCallback)
  state.lineVertical = calPosition(cur, 2, curVertical, adsorbCallback)
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
