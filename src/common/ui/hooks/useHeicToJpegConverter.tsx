import {useState} from "react"

export type AcceptedFilesType = File[];

type ConversionProgress = {
  total: number;
  current: number;
  percentage: number;
}

export const useHeicToJpegConverter = (decoder:any) => {
  const [isConverting, setIsConverting] = useState(false)
  const [convertionProgress, setConvertionProgress] = useState<ConversionProgress>({
    total: 0,
    current: 0,
    percentage: 43
  })

  const convertHeicToJpeg = async (files: AcceptedFilesType) => {
    const convertedImages: string[] = []

    setIsConverting(true)
    setConvertionProgress({
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

          const previewUrl = canvas.toDataURL('image/jpeg', 0.5)
          convertedImages.push(previewUrl)


          const current = index + 1
          const percentage = Math.round((current / files.length) * 100)
          setConvertionProgress({
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
    return {convertedImages}
  }


  return  { convertHeicToJpeg, conversionProgress: convertionProgress, isConverting}
}