import { useRouter } from "next/router"

export default function Finish() {
  const router = useRouter()
  return (
    <>
      <div className='w-screen h-screen bg-gradient-to-tr from-white to-indigo-200 flex flex-col items-center justify-center'>
        <div className='font-bold text-2xl p-10'>終了</div>
        <button
          className='border shadow-lg rounded-md px-6 py-2 bg-gradient-to-bl from-blue-500 to-purple-500 text-white'
          onClick={() => router.push('/')}
        >
          もう一度
        </button>
      </div>
    </>
  )
}
