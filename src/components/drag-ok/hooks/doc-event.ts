type DocEvent = {
  id: string,
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
