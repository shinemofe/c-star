import { reactive } from 'vue'
import { addEvent } from './doc-event'
import { useDrag } from './use-drag'
import MouseDownEvent = JQuery.MouseDownEvent;

type Direction = 'lt' | 'rt' | 'lb' | 'rb'

const { current } = useDrag()
const state = reactive({
  startX: 0,
  startY: 0,
  offsetX: 0,
  offsetY: 0,
  resizing: false
})

export function useResizer () {
  addEvent({
    id: 'use-resizer',
    mousemove: handleMouseMove,
    mouseup: handleMouseUp
  })

  return {
    handleMouseDown
  }
}

let previousWidth: number
let previousHeight: number
let previousX: number
let previousY: number
let direction: Direction
function handleMouseDown (e: MouseDownEvent, dir: Direction) {
  state.startX = e.pageX
  state.startY = e.pageY
  const itemEl = e.target
  const rect = itemEl.getBoundingClientRect()
  state.offsetX = state.startX - rect.x
  state.offsetY = state.startY - rect.y
  state.resizing = true
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { width, height, x, y } = current.value
  previousWidth = width
  previousHeight = height
  previousX = x
  previousY = y
  direction = dir
}

function handleMouseMove (e: MouseEvent) {
  if (state.resizing && current && current.value) {
    const moveX = e.pageX - state.offsetX
    const moveY = e.pageY - state.offsetY
    const offsetX = moveX - state.startX
    const offsetY = moveY - state.startY
    let width = 0
    let height = 0
    if (direction === 'lt') {
      width = previousWidth - offsetX
      height = previousHeight - offsetY
      current.value.x = previousX + offsetX
      current.value.y = previousY + offsetY
    } else if (direction === 'rt') {
      width = previousWidth + offsetX
      height = previousHeight - offsetY
      current.value.y = previousY + offsetY
    } else if (direction === 'lb') {
      width = previousWidth - offsetX
      height = previousHeight + offsetY
      current.value.x = previousX + offsetX
    } else if (direction === 'rb') {
      width = previousWidth + offsetX
      height = previousHeight + offsetY
    }
    current.value.width = width
    current.value.height = height
  }
}

function handleMouseUp () {
  state.resizing = false
}
