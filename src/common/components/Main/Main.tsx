import * as domain from "node:domain"
import {Button} from "../../ui"
import React from "react"
import {DropZone} from "../DropZone/DropZone"

export const Main = () => {
  return (
    <main className="p-3 w-5/6 mx-auto">
      <h1 className='text-2xl mb-3'>Convert HEIC to JPEG</h1>
      <p className='mb-3'>Drag and drop your HEIC files here</p>
      <DropZone/>
      <div>
        <Button label={'Convert'} className={"bg-btn--primary text-white hover:opacity-50 w-1/3 mb-3"}/>
        <p className='mb-5'>Your converted JPEG files will be ready in a few seconds</p>
        <Button label={'Download All'} className={"bg-btn--secondary text-black hover:opacity-50"}/>
      </div>

    </main>
  )
}