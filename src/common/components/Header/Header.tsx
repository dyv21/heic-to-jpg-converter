import {Button} from "../../ui"

export const Header = () => {
  return (
    <header className="flex align-middle justify-between mx-auto p-3">
      <a href="/" className="py-1">HEICformatter</a>
      <Button className="bg-btn--primary text-white hover:opacity-80" label={'Help'}/>
    </header>
  )
}