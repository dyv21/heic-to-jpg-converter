import { Button } from "../../ui"
import React, { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
// @ts-ignore
import libheif from 'libheif-js'

type AcceptedFilesType = File[];

interface ConversionProgress {
  total: number;
  current: number;
  percentage: number;
}

export const DropZone = () => {
  const [loadedImg, setLoadedImg] = useState<string[]>([])
  const [isDisable, setDisable] = useState<boolean>(true)
  const [isLoading, setIsLoading] = useState(true)
  const [decoder, setDecoder] = useState<any>(null)
  const [conversionProgress, setConversionProgress] = useState<ConversionProgress>({
    total: 0,
    current: 0,
    percentage: 0
  })
  const [isConverting, setIsConverting] = useState(false)

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

  const convertToJpeg = async (files: AcceptedFilesType) => {
    const convertedImages: string[] = []
    const downloadUrls: string[] = []

    setIsConverting(true)
    setConversionProgress({
      total: files.length,
      current: 0,
      percentage: 0
    })

    // @ts-ignore
    for (const [index, file] of files.entries()) {
      if (file.name.toLowerCase().endsWith('.heic')) {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const data = new Uint8Array(arrayBuffer)

          if (!decoder) {
            throw new Error('HeifDecoder not initialized')
          }

          const heifData = decoder.decode(data)

          if (!heifData || heifData.length === 0) {
            throw new Error('Failed to decode file')
          }

          const image = heifData[0]
          const width = image.get_width()
          const height = image.get_height()

          const canvas = document.createElement('canvas')
          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')

          if (!ctx) {
            throw new Error('Failed to create canvas context')
          }

          const imageData = ctx.createImageData(width, height)

          await new Promise<void>((resolve) => {
            image.display(imageData, () => resolve())
          })

          ctx.putImageData(imageData, 0, 0)

          // Create preview URL
          const previewUrl = canvas.toDataURL('image/jpeg', 0.5)
          convertedImages.push(previewUrl)

          // Create download blob with better quality
          const jpegBlob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) resolve(blob)
            }, 'image/jpeg', 0.9)
          })

          const downloadUrl = URL.createObjectURL(jpegBlob)
          downloadUrls.push(downloadUrl)

          // Update progress
          const current = index + 1
          const percentage = Math.round((current / files.length) * 100)
          setConversionProgress({
            total: files.length,
            current,
            percentage
          })

        } catch (error) {
          console.error('Error converting HEIC:', error)
        }
      }
    }

    setIsConverting(false)
    setDisable(false)
    return { convertedImages, downloadUrls }
  }

  const onDrop = useCallback(async (acceptedFiles: AcceptedFilesType) => {
    const { convertedImages } = await convertToJpeg(acceptedFiles)
    setLoadedImg(convertedImages)
  }, [decoder])

  const handleDownloadAll = async () => {
    const { downloadUrls } = await convertToJpeg(loadedImg.map(url =>
      new File([url], 'image.heic', { type: 'image/heic' })
    ))

    downloadUrls.forEach((url, index) => {
      const link = document.createElement('a')
      link.href = url
      link.download = `converted_${index + 1}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
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
          <Button label={'Browse'} className={"bg-btn--secondary text-black hover:opacity-50"} />
        </div>
      </div>

      {isConverting && (
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>Converting images in progress...</span>
            <span>{conversionProgress.current} of {conversionProgress.total}</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-500 rounded transition-all duration-300"
              style={{ width: `${conversionProgress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {loadedImg.length != 0 && (
        <div className="flex items-center bg-btn--secondary rounded-xl p-3 mb-3">
          {loadedImg.map((src, index) => (
            <div key={index} className="mr-3">
              <img src={src} className="rounded-lg" alt={`Preview ${index}`} width={100} height={100} />
            </div>
          ))}
        </div>
      )}

      <div>
        <p className='mb-5'>Download yours converted JPEG files here</p>
        <Button
          disabled={isDisable}
          label={'Download All'}
          onClick={handleDownloadAll}
          className={isDisable ? 'bg-btn--secondary text-black cursor-default' : 'text-white bg-btn--primary'}
        />
      </div>
    </>
  )
}