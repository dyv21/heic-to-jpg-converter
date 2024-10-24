import * as domain from "node:domain"
import {Button} from "../../ui"
import React from "react"

export const Main = () => {
  return (
    <main className="p-3 w-5/6 mx-auto">
      <h1 className='text-2xl mb-3'>Convert HEIC to JPEG</h1>
      <p className='mb-3'>Drag and drop your HEIC files here</p>
      <div id="drop_zone" className="flex justify-center items-center h-96 border-2  border-dashed rounded-xl  mb-3"
        // onDrop="dropHandler(event);"
        // onDragOver="dragOverHandler(event);"
      >
        <div className="text-center">
          <h2 className='text-xl'>Drag & Drop HEIC Files</h2>
          <p className='mb-32'>or click here to browse</p>
          <Button label={'Browse'} className={"bg-btn--secondary text-black hover:opacity-50"}/>
        </div>
      </div>
      <div>
        <Button label={'Convert'} className={"bg-btn--primary text-white hover:opacity-50 w-1/3 mb-3"}/>
        <p className='mb-5'>Your converted JPEG files will be ready in a few seconds</p>
        <Button label={'Download All'} className={"bg-btn--secondary text-black hover:opacity-50"}/>
      </div>

    </main>
  )
}