import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/googleAppointment.scss"
// @ts-ignore
import script from "./scripts/googleAppointment.inline"

interface Options {
  url: string
  color?: string
  label?: string
}

export default ((opts: Options) => {
  const GoogleAppointment: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div
        class={`${displayClass ?? ""} google-appointment`}
        data-url={opts.url}
        data-color={opts.color ?? "#039BE5"}
        data-label={opts.label ?? "일정 예약"}
      ></div>
    )
  }

  GoogleAppointment.css = style
  GoogleAppointment.afterDOMLoaded = script
  return GoogleAppointment
}) satisfies QuartzComponentConstructor<Options>
