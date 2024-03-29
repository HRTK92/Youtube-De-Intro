import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const vilidateUrl = (url: string) => {
  return url.match(/https:\/\/youtu.be\/[a-zA-Z0-9_-]{11}/) !== null || url.match(/https:\/\/www.youtube.com\/watch\?v=[a-zA-Z0-9_-]{11}/) !== null
}

export default function Ready() {
  const router = useRouter()

  const [urls, setUrls] = useState<string[]>([])
  const [inputUrl, setInputUrl] = useState<string>('')
  const [isRandom, setIsRandom] = useState<boolean>(true)

  return (
    <>
      <Head>
        <title>流す曲を選択 | Youtubeでイントロ</title>
      </Head>
      <div className='w-screen h-screen bg-gradient-to-tr from-white to-indigo-200 flex flex-col'>
        <div className='p-3 text-2xl font-bold'>曲を選択</div>
        <div className='p-4 justify-center flex'>
          <div className='border shadow-md rounded-xl bg-white w-4/5'>
            <div className='p-2'>
              <div className='flex flex-col'>
                <div className='p-3'>
                  <label htmlFor='inputURL' className='text-xl'>YouTube</label>
                  <div className='flex flex-col'>
                    {urls.map((url, index) => {
                      return (
                        <div
                          className='bg-gradient-to-r from-cyan-500 to-purple-600 rounded-md text-white text-sm p-1 mx-3 my-1'
                          key={index}
                        >
                          {url}
                        </div>
                      )
                    })}
                  </div>
                  <div className='flex flex-col w-full'>
                    <input
                      className='border shadow-md rounded-md h-8'
                      type='text'
                      id='inputURL'
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                          if (!vilidateUrl(inputUrl)) {
                            return
                          }
                          setUrls([...urls, inputUrl])
                          setInputUrl('')
                        }
                      }}
                    />
                    <button
                      className='bg-gray-400 text-white px-2 py-1 rounded-md border w-24 my-1 ml-auto'
                      onClick={() => {
                        setUrls([...urls, inputUrl])
                        setInputUrl('')
                      }}
                      disabled={!vilidateUrl(inputUrl)}
                    >
                      追加
                    </button>
                  </div>
                </div>
                <div className='p-3'>
                  <input
                    id='default-checkbox'
                    type='checkbox'
                    className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 focus:ring-2'
                    checked={isRandom}
                    onChange={(e) => setIsRandom(e.target.checked)}
                  />
                  <label
                    htmlFor='default-checkbox'
                    className='ml-2 text-sm font-medium text-gray-900'
                  >
                    ランダムに再生
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='px-8 py-2'>
          <div className='flex justify-end'>
            <button
              className='px-6 py-2 bg-gradient-to-bl from-blue-500 to-purple-500 text-white rounded-md shadow'
              onClick={() => {
                if (urls.length === 0) {
                  return
                }
                router.push({
                  pathname: '/play',
                  query: {
                    urls: urls.join(',').replace(/https:\/\/youtu.be\//g, ''),
                    isRandom: isRandom,
                  },
                })
              }}
            >
              開始
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
