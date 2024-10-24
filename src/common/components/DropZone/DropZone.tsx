import {Button} from "../../ui"
import React, {useRef} from "react"

export const DropZone = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDropzoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    // Обработка выбранных файлов
    console.log(files);
  };


  return (
    <div id="drop_zone" className="flex justify-center items-center h-96 border-2  border-dashed rounded-xl  mb-3"
         onClick={handleDropzoneClick}
      // onDrop="dropHandler(event);"
      // onDragOver="dragOverHandler(event);"
    >
      <div className="text-center">

        <h2 className='text-xl'>Drag & Drop HEIC Files</h2>
        <p className='mb-32'>or click here to browse</p>
        <input
          type="file"
          id='file-input'
          className='hidden'
          accept=".image/heic"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <Button label={'Browse'} className={"bg-btn--secondary text-black hover:opacity-50"}/>

      </div>
    </div>
  )
}