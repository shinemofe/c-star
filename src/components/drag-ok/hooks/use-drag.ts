import { reactive, toRefs } from 'vue'
import { State, DropOptions, DragOptions, DropData } from '../types'
import { addEvent, emitEventMousedown } from './doc-event'

const dragWrapperMap = new WeakMap<Node, DragOptions>()
const dropTargetMap = new WeakMap<Node, DropOptions>()
const state = reactive<State>({
  startX: 0,
  startY: 0,
  startOffsetX: 0,
  startOffsetY: 0,
  moveX: 0,
  moveY: 0,
  dragging: false,
  draggingEl: undefined,
  dropContainerEl: undefined,
  dropResult: [],
  current: undefined
})

function setItemPosition (x: number, y: number, itemId?: string): { x: number, y: number } {
  let item
  const rect = state.dropContainerEl!.getBoundingClientRect()
  if (itemId) {
    item = state.dropResult.find(x => x.id === Number(itemId))!
    item.x = x - rect.x
    item.y = y - rect.y
  }
  return {
    x: x - rect.x,
    y: y - rect.y
  }
}

function handleMouseDown (e: MouseEvent, itemEl: HTMLDivElement) {
  state.startX = e.pageX
  state.startY = e.pageY
  state.dragging = true
  state.draggingEl = itemEl
  const draggingElRect = itemEl.getBoundingClientRect()
  state.startOffsetX = state.startX - draggingElRect.x
  state.startOffsetY = state.startY - draggingElRect.y
  emitEventMousedown(e)
}

function handleMouseMove (e: MouseEvent) {
  if (state.dragging) {
    state.moveX = e.pageX - state.startOffsetX
    state.moveY = e.pageY - state.startOffsetY
    const dataset = state.draggingEl!.dataset
    if (dataset.id) {
      // const item = state.dropResult.find(x => x.id === Number(dataset.id))!
      // const rect = state.dropContainerEl!.getBoundingClientRect()
      // item.x = state.moveX - rect.x
      // item.y = state.moveY - rect.y
      setItemPosition(state.moveX, state.moveY, dataset.id)
    }
  }
}

function handleMouseUp () {
  if (state.dragging) {
    const { options } = getDraggingOptions()
    if (options && options.targetEl) {
      // 判断当前左上点是否在 target 盒子内
      if (isPointInElBox({ x: state.moveX, y: state.moveY }, options.targetEl)) {
        const dropOptions = dropTargetMap.get(state.dropContainerEl!)
        if (dropOptions) {
          // 将页面 position 转换为相对画布的 position
          // const rect = state.dropContainerEl!.getBoundingClientRect()
          const dataset = state.draggingEl!.dataset
          if (!dataset.id) {
            const { x, y } = setItemPosition(state.moveX, state.moveY)
            const data = {
              id: Date.now(),
              source: dataset.source!,
              x,
              y,
              // x: state.moveX - rect.x,
              // y: state.moveY - rect.y,
              zIndex: 1,
              width: Number(dataset.width!),
              height: Number(dataset.height!)
            }
            state.dropResult.push(data)
            dropOptions.ondrop(data)
            setCurrent(data)
          }
        }
      } else {
        // console.log('out')
      }
    } else {
      console.warn('未设置 target 容器')
    }

    state.dragging = false
    state.draggingEl = undefined
  }
}

function getDraggingOptions (): { key: Node, options?: DragOptions } {
  const key = state.draggingEl!.parentNode!
  const options = dragWrapperMap.get(key)
  return {
    key,
    options
  }
}

function isPointInElBox (point: { x: number, y: number }, el: HTMLDivElement): boolean {
  const rect = el.getBoundingClientRect()
  return point.x >= rect.x &&
    point.y >= rect.y &&
    point.x <= (rect.x + rect.width) &&
    point.y <= (rect.y + rect.height)
}

function initDrag (options: DragOptions): void {
  if (!options.wrapperEl) {
    console.error('initDrag 时 wrapper DOM 未获取到')
  }

  let targetEl: HTMLDivElement | null = null
  if (options.targetSelector) {
    targetEl = document.querySelector(options.targetSelector)
  }
  dragWrapperMap.set(options.wrapperEl!, {
    targetEl,
    wrapperEl: options.wrapperEl
  })
}

function initDrop (options: DropOptions): void {
  state.dropContainerEl = options.dropContainerEl
  dropTargetMap.set(options.dropContainerEl, options)
}

function setCurrent (item: DropData) {
  state.current = item
}

export function useDrag () {
  addEvent({
    id: 'use-drag',
    mousemove: handleMouseMove,
    mouseup: handleMouseUp
  })

  return {
    ...toRefs(state),
    initDrag,
    initDrop,
    setCurrent,
    // setItemPosition,
    handleMouseDown
  }
}
