import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
        <div className='p-4 '>
          <div className='border shadow-md w-full h-full rounded-xl bg-white'>
            <div className='p-2'>
              <div className='flex flex-col'>
                <div className='p-3'>
                  <label htmlFor='inputURL'>Youtube</label>
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
                  <div className='flex justify-between w-full'>
                    <input
                      className='border shadow-md rounded-md'
                      type='text'
                      id='inputURL'
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                    />
                    <button
                      className='bg-gray-400 text-white px-2 py-1 rounded-md border'
                      onClick={() => {
                        setUrls([...urls, inputUrl])
                        setInputUrl('')
                      }}
                      disabled={inputUrl.match(/https:\/\/youtu.be\/[a-zA-Z0-9_-]{11}/) === null}
                      placeholder='https://youtu.be/xxxxxxxxxxx'
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
