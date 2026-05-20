import { QuartzComponent, QuartzComponentProps } from "./types"
import RecentNotes from "./RecentNotes"

const RecentNotesForIndex: QuartzComponent = (props: QuartzComponentProps) => {
  if (props.fileData.slug !== "index") {
    return null
  }

  const IndexRecentNotes = RecentNotes({
    title: "Recent Posts",
    limit: 5,
    showTags: true,
    linkToMore: false,
    filter: (file) => file.slug !== "index",
  })

  return <IndexRecentNotes {...props} />
}

export default RecentNotesForIndex
