import React, { useState } from 'react'

import { Globe, Search, Filter, ArrowDownNarrowWide } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { fetchDataFromAPI } from '../../../features/apiService'
import { setApiData } from '../../../features/apiSlice'
import { categories } from '../../../constants/categories'
import { languageOptions } from '../../../constants/languages'
import { sortByOptions } from '../../../constants/sortBy'

const Header = () => {
  const [activeCategory, setActiveCategory] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [sortBy, setSortBy] = useState('')

  const dispatch = useDispatch()
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await fetchDataFromAPI(searchInput, activeCategory, sortBy, selectedLanguage)
      dispatch(setApiData(data))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className='flex flex-row p-10'>
        <h1 className='text-3xl font-bold pr-2 items-center'>NewsAPI</h1>
        <div className='w-full'>
          <form
            onSubmit={handleFormSubmit}
            className='flex flex-row w-full border-b-2 p-2 border-black items-center'
          >
            <Search strokeWidth={3} />
            <input
              type='text'
              name='search'
              placeholder='Search'
              className='w-full h-[32] pl-2'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className='flex flex-row gap-3 border border-black p-2.5 mr-2'>
              <Filter strokeWidth={2} />
              <select
                id='categories'
                className='text-gray-900 text-sm focus:ring-blue-500 block emoji'
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
              >
                <option value='' disabled>
                  Category
                </option>
                {categories.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-row gap-3 border border-black p-2.5 mr-2'>
              <ArrowDownNarrowWide strokeWidth={2} />
              <select
                id='sortBy'
                className='text-gray-900 text-sm focus:ring-blue-500 block emoji'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='' disabled>
                  Sort By
                </option>
                {sortByOptions.map((option) => (
                  <option key={option.slug} value={option.slug}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex flex-row gap-3 border border-black p-2.5 mr-2'>
              <Globe strokeWidth={2} />
              <select
                id='countries'
                className='text-gray-900 text-sm focus:ring-blue-500 block emoji'
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <option value='' disabled>
                  Language
                </option>
                {languageOptions.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.label}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className='p-2.5 border border-black'>
              <Calendar strokeWidth={2} />
            </div> */}
            <button
              type='submit'
              className='border p-2.5 border-black font-semibold ml-2 hover:bg-black hover:text-white'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Header
