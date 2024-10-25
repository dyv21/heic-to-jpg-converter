import {Button} from "../../ui"
import React, {useCallback, useRef} from "react"
import {useDropzone} from "react-dropzone"

type AcceptedFilesType = File[];


export const DropZone = () => {

  const onDrop = useCallback((acceptedFiles:AcceptedFilesType) => {

    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true
  });



  return (
    <div {...getRootProps()}  id="drop_zone" className="flex justify-center items-center h-96 border-2  border-dashed rounded-xl  mb-3"
    >
      <div className="text-center">
        <h2 className='text-xl'>Drag & Drop HEIC Files</h2>
        <p className='mb-32'>or click here to browse</p>
        <input
          type="file"
          id='file-input'
          className='hidden'
          accept=".image/heic"
          {...getInputProps()}
        />

        <Button label={'Browse'} className={"bg-btn--secondary text-black hover:opacity-50"}/>

      </div>
    </div>
  )
}