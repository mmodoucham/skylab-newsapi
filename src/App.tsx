/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import Header from './app/components/Header'
import { ChevronRight, Newspaper, PaintBucket } from 'lucide-react'
import { sources } from './constants/sources'
import { useSelector } from 'react-redux'
import moment from 'moment'

interface RootState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apiData: any
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [news, setNews] = useState<any>(null)

  const apiData = useSelector((state: RootState) => state.apiData)
  useEffect(() => {
    setNews(apiData)
    console.log(news)
  }, [apiData, news])

  return (
    <>
      <main className='container mx-auto bg-white min-h-screen mt-20'>
        <Header />
        <div className='flex p-10'>
          <div className='w-3/4 pr-10'>
            <div className=''>
              <div className='w-full border-b-4 border-black pb-2 flex flex-row items-center'>
                <Newspaper strokeWidth={2} />
                <h2 className='text-3xl font-semibold pl-2'>Recent News</h2>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 pt-5'>
              {news ? (
                news.map((item: any) => (
                  <div className=' p-4' key={item.title}>
                    <p className='text-gray-300'>{item.source.name}</p>
                    <h2 className='text-black font-semibold text-2xl py-2'>{item.title}</h2>
                    <div className='flex gap-2 italic text-gray-800 py-1'>
                      <span>{moment(item.publishedAt).format('YYYY-MM-DD')}</span>|
                      <span>{item.author}</span>
                    </div>
                    <p className=''>{item.description}</p>
                  </div>
                ))
              ) : (
                <div className='flex justify-center items-center h-64'>
                  <h2 className='text-2xl font-semibold'>Search to get some news!</h2>
                </div>
              )}
            </div>
          </div>
          <div className='w-1/4  sticky top-0'>
            <div className=''>
              <div className='w-full border-b-4 border-black pb-2 flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                  <PaintBucket strokeWidth={2} />
                  <h2 className='text-3xl font-semibold pl-2'>Top Sources</h2>
                </div>
                <ChevronRight strokeWidth={2} />
              </div>
            </div>
            <div className='flex flex-col pt-2 gap-3'>
              {sources.map((source) => (
                <a className='flex flex-row gap-2 items-center' key={source.title}>
                  <h3 className='text-xl font-semibold'>{source.title}</h3> -
                  <span className='text-gray-400 text-xl font-normal'>{source.language}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
