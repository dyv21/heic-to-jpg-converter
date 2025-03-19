import {Button} from "../../ui"
import React, {useCallback, useEffect, useState} from "react"
import {useDropzone} from "react-dropzone"
// @ts-ignore
import libheif from 'libheif-js/wasm-bundle';
import {AcceptedFilesType, useHeicToJpegConverter} from "../../ui/hooks/useHeicToJpegConverter"



export const DropZone = () => {
  const [loadedImg, setLoadedImg] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [decoder, setDecoder] = useState<any>(null)



  const { convertHeicToJpeg, conversionProgress, isConverting} = useHeicToJpegConverter(decoder)

  useEffect(() => {
    const initializeDecoder = async () => {
      try {
        const heifDecoder = new libheif.HeifDecoder()
        setDecoder(heifDecoder)
        setIsLoading(false)
        console.log('libheif initialized successfully')
      } catch (err) {
        console.error('Failed to initialize libheif:', err)
        setIsLoading(false)
      }
    }
    initializeDecoder()
  }, [])

  const onDrop = useCallback(async (acceptedFiles: AcceptedFilesType) => {
    const {convertedImages} = await convertHeicToJpeg(acceptedFiles)
    setLoadedImg(convertedImages)
  }, [decoder])


  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/heic': ['.heic', '.HEIC']
    }
  })

  if (isLoading) {
    return <div>Loading converter...</div>
  }

  return (
    <>
      <div {...getRootProps()} id="drop_zone"
           className="flex justify-center items-center h-96 border-2 border-dashed rounded-xl mb-3"
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

      {isConverting && (
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>Converting images in progress...</span>
            <span>{conversionProgress.current} of {conversionProgress.total}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded ">
            <div
              className="h-full bg-blue-500 rounded transition-all duration-300 "
              style={{width: `${conversionProgress.percentage}%`}}
            />
          </div>
        </div>
      )}
`
      {loadedImg.length != 0 && (
        <div>
          <div className="flex items-center bg-btn--secondary rounded-xl p-3 mb-3">
            {loadedImg.map((src, index) => (
              <div key={index} className="mr-3">
                <a download={`picture-${index}.jpg`} href={src}>
                  <img src={src} className="rounded-lg"
                       alt={`Preview ${index}`} width={100} height={100}/></a>
              </div>
            ))}
          </div>
          <p>Click on preview to download</p>
        </div>
      )}
    </>
  )
}