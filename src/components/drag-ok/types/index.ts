export type DropData = {
  id: number,
  x: number,
  y: number,
  source: number | string,
  zIndex: number,
  width: number,
  height: number
}

export type DropOptions = {
  ondrop: (position: DropData) => void,
  dropContainerEl: HTMLDivElement
}

export type DragOptions = {
  wrapperEl?: HTMLDivElement | null,
  targetSelector?: string,
  targetEl?: HTMLDivElement | null
}

export type State = {
  startX: number,
  startY: number,
  startOffsetX: number,
  startOffsetY: number,
  moveX: number,
  moveY: number,
  dragging: boolean,
  dragMoving: boolean,
  draggingEl?: HTMLDivElement,
  dropContainerEl?: HTMLDivElement,
  dropResult: Array<DropData>,
  current?: DropData
}
