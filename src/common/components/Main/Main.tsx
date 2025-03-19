import {DropZone} from "../DropZone/DropZone"

export const Main = () => {
  return (
    <main className="p-3 w-5/6 mx-auto md:w-3/4">
      <h1 className='text-2xl mb-3'>Convert HEIC to JPEG</h1>
      <DropZone/>
    </main>
  )
}