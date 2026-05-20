type AppointmentWindow = Window &
  typeof globalThis & {
    calendar?: {
      schedulingButton?: {
        load: (opts: { url: string; color: string; label: string; target: Element }) => void
      }
    }
    googleAppointmentScriptPromise?: Promise<void>
  }

const appointmentWindow = window as AppointmentWindow

const calendarStylesheetId = "google-calendar-appointment-stylesheet"
const calendarScriptSrc = "https://calendar.google.com/calendar/scheduling-button-script.js"
const calendarStylesheetHref = "https://calendar.google.com/calendar/scheduling-button-script.css"

const ensureCalendarStylesheet = () => {
  if (document.getElementById(calendarStylesheetId)) {
    return
  }

  const link = document.createElement("link")
  link.id = calendarStylesheetId
  link.href = calendarStylesheetHref
  link.rel = "stylesheet"
  document.head.appendChild(link)
}

const ensureCalendarScript = () => {
  if (appointmentWindow.calendar?.schedulingButton?.load) {
    return Promise.resolve()
  }

  if (appointmentWindow.googleAppointmentScriptPromise) {
    return appointmentWindow.googleAppointmentScriptPromise
  }

  appointmentWindow.googleAppointmentScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${calendarScriptSrc}"]`,
    )

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true })
      existingScript.addEventListener("error", () => reject(), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = calendarScriptSrc
    script.async = true
    script.addEventListener("load", () => resolve(), { once: true })
    script.addEventListener("error", () => reject(), { once: true })
    document.head.appendChild(script)
  })

  return appointmentWindow.googleAppointmentScriptPromise
}

document.addEventListener("nav", () => {
  const targets = document.querySelectorAll<HTMLElement>(".google-appointment")
  if (!targets.length) {
    return
  }

  ensureCalendarStylesheet()
  ensureCalendarScript().then(() => {
    for (const target of targets) {
      if (target.dataset.loaded === "true") {
        continue
      }

      const url = target.dataset.url
      if (!url || !appointmentWindow.calendar?.schedulingButton?.load) {
        continue
      }

      target.dataset.loaded = "true"
      appointmentWindow.calendar.schedulingButton.load({
        url,
        color: target.dataset.color ?? "#039BE5",
        label: target.dataset.label ?? "일정 예약",
        target,
      })
    }
  })
})
