type DocEvent = {
  id: string,
  mousedown?: (e: MouseEvent) => void,
  mousemove: (e: MouseEvent) => void,
  mouseup: (e: MouseEvent) => void,
}

let isEventBindToDoc = false
const events: DocEvent[] = []

export function addEvent (ev: DocEvent) {
  bindDoc()
  const exist = events.find(x => x.id === ev.id)
  if (exist) {
    console.warn(`DocEvent: ${ev.id} is exist!`)
  } else {
    events.push(ev)
  }
}

export function removeEvent (id: string) {
  const index = events.findIndex(x => x.id === id)
  if (index > -1) {
    events.splice(index, 1)
  }
}

export function emitEventMousedown (e: MouseEvent) {
  // id ? events.filter(x => x.id === id)
  events.forEach(item => {
    item.mousedown && item.mousedown(e)
  })
}

export function bindDoc () {
  if (!isEventBindToDoc) {
    document.documentElement.addEventListener('mousemove', e => {
      events.forEach(ev => {
        ev.mousemove && ev.mousemove(e)
      })
    })

    document.documentElement.addEventListener('mouseup', e => {
      events.forEach(ev => {
        ev.mouseup && ev.mouseup(e)
      })
    })

    isEventBindToDoc = true
  }
}
