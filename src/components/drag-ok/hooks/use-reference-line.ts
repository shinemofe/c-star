import { reactive, toRefs } from 'vue'
import { useDrag } from './use-drag'
import { addEvent } from './doc-event'

const PX_HIDDEN = -10000
const PX_ADSORB = 4
const { dragging, current, dropResult, draggingEl, dropContainerEl, moveX, moveY, setDragState, setItemPosition } = useDrag()
const state = reactive({
  lineHorizontal: [PX_HIDDEN, PX_HIDDEN, PX_HIDDEN],
  lineVertical: [PX_HIDDEN, PX_HIDDEN, PX_HIDDEN],
  distanceHorizontal: [0, 0, 0],
  distanceVertical: [0, 0, 0]
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
  const horizontal = calPosition(cur, 1, curHorizontal, adsorbCallback)
  const vertical = calPosition(cur, 2, curVertical, adsorbCallback)
  state.lineHorizontal = horizontal.positions
  state.lineVertical = vertical.positions
  state.distanceHorizontal = calDistance(cur, horizontal.lineRelationId, 1)
  // console.log(horizontal.positions, calDistance(cur, horizontal.lineRelationId, 1), horizontal.lineRelationId)
  state.distanceVertical = calDistance(cur, vertical.lineRelationId, 2)
}

function handleMouseup () {
  dropContainerItemsPositions = []
}

function calPosition (curState, type: 1 | 2, curPosition, adsorbCallback) {
  const lineRelationId = [undefined, undefined, undefined]
  const positions = curPosition.map((px, i) => {
    let value
    for (const { horizontal, vertical, id } of dropContainerItemsPositions) {
      /**
       * ?????????????????????
       */
      const siblingState = type === 1 ? horizontal : vertical
      value = siblingState.find(siblingPx => px <= siblingPx + PX_ADSORB && px >= siblingPx - PX_ADSORB)
      /**
       * ????????????
       * ???????????????????????????????????????
       */
      if (value) {
        let position
        const { width, height } = curState
        const dimension = type === 1 ? height : width
        const positionKey = type === 1 ? 'y' : 'x'
        if (i === 0) {
          position = value
        } else if (i === 1) {
          position = value - dimension / 2
        } else {
          position = value - dimension
        }
        adsorbCallback(positionKey, position)
        /**
         * ????????????????????????
         */
        lineRelationId[i] = id
        break
      }
    }
    return value || PX_HIDDEN
  })
  return {
    positions,
    lineRelationId
  }
}

function calDistance (cur, lineRelationId, type: 1 | 2) {
  const { x, y, width, height } = cur
  const isHorizontal = type === 1
  return lineRelationId.map(id => {
    if (!id) {
      return 0
    }
    const item = dropResult.value.find(x => x.id === id)
    /**
     * ??????????????????
     * ?????????????????????
     */
    if (isHorizontal) {
      // ????????????
      if (x > item.x + item.width) {
        // ??????
        return x - (item.x + item.width)
      } else if (x + width < item.x) {
        // ??????
        return item.x - (x + width)
      }
      return 0
    }
    // ????????????
    if (y > item.y + item.height) {
      // ??????
      return y - (item.y + item.height)
    } else if (y + height < item.y) {
      // ??????
      return item.y - (y + height)
    }
    return 0
  })
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
