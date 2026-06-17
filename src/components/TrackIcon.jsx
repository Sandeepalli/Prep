import { ServerIcon, CodeIcon, ChipIcon, UserIcon } from './Icons'

const map = {
  server: ServerIcon,
  code: CodeIcon,
  chip: ChipIcon,
  user: UserIcon,
}

export default function TrackIcon({ name, ...rest }) {
  const Cmp = map[name] || CodeIcon
  return <Cmp {...rest} />
}
