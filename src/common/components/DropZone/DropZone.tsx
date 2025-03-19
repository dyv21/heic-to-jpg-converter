import {Button} from "../../ui"
import  {useCallback, useMemo, useState} from "react"
import {useDropzone} from "react-dropzone"
// @ts-ignore
import libheif from 'libheif-js/wasm-bundle';
import {Loader} from "../../ui/Loader/Loader"
import {AcceptedFilesType, useHeicToJpegConverter} from "../../hooks/useHeicToJpegConverter"


export const DropZone = () => {
  const [loadedImg, setLoadedImg] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const decoder = useMemo(() => {
    try {
      const heifDecoder = new libheif.HeifDecoder();
      console.log('libheif initialized successfully');
      setIsLoading(false);
      return heifDecoder;
    } catch (err) {
      console.error('Failed to initialize libheif:', err);
      setIsLoading(false);
      return null;
    }
  }, []);


  const {convertHeicToJpeg, isConverting} = useHeicToJpegConverter(decoder)


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
    return <Loader />
  }

  return (
    <>
      <div {...getRootProps()} id="drop_zone"
           className="flex justify-center items-center h-96 border-2 border-dashed rounded-xl mb-3 cursor-pointer"
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
          <Button label={'Browse'} className={"bg-btn--primary text-white hover:opacity-50"}/>
        </div>
      </div>

      {isConverting &&  <Loader />}
      {loadedImg.length > 0 && (
        <div>
          <div className="flex items-center bg-btn--secondary rounded-xl p-3 mb-3">
            {loadedImg.map((src, index) => (
              <div key={index} className="mr-3">
                <a download={`picture-${index}.jpg`} href={src}>
                  <img src={src} className="rounded-lg" alt={`Preview ${index}`} width={100} height={100}/>
                </a>
              </div>
            ))}
          </div>
          <p>Click on preview to download</p>
        </div>
      )}
    </>
  )
}