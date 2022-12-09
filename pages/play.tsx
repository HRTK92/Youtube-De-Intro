import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Play() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [hide, setHide] = useState<boolean>(true)
  const [index, setIndex] = useState<number>(0)
  const { urls, isRandom } = router.query as { urls: string; isRandom: 'true' | 'false' }
  let playlist: string[] = []

  if (isRandom === 'true') {
    playlist = urls.split(',').sort(() => Math.random() - 0.5)
  } else {
    playlist = urls.split(',')
  }

  return (
    <>
      <Head>
        <title>出題中 - {index+1}問目 | Youtubeでイントロ</title>
      </Head>
      <div className='h-screen bg-gradient-to-tr from-white to-indigo-200 flex flex-col'>
        <div className='text-2xl px-1 py-2 font-medium'>
          {index + 1}/{playlist.length}問目
        </div>

        <iframe
          className={`w-50 h-32 p-2 ${hide ? 'blur-lg' : ''}`}
          src={`https://www.youtube.com/embed/${playlist[index]}?autoplay=1`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
        <div className='px-4 py-2 flex flex-row justify-between'>
          <div>
            <button
              className='bg-gray-400 text-white px-2 py-1 rounded-md border'
              onClick={() => {
                setHide(!hide)
              }}
            >
              {hide ? '表示' : '非表示'}
            </button>
          </div>
          <div>
            <button
              className='bg-gray-400 text-white px-2 py-1 rounded-md border'
              onClick={() => {
                if (index === 0) {
                  router.push('/readyToStart')

                  return
                }
                setIndex(index - 1)
                if (hide) {
                  setHide(!hide)
                }
              }}
            >
              前へ
            </button>

            <button
              className='bg-gray-400 text-white px-2 py-1 rounded-md border'
              onClick={() => {
                if (playlist.length - 1 === index) {
                  router.push('/finish')
                  return
                }
                setIndex(playlist.length - 1)
                setIndex(index + 1)
                if (hide) {
                  setHide(!hide)
                }
              }}
            >
              次へ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
