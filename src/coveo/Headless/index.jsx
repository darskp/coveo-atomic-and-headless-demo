import React from 'react'
import SearchBox from './SearchBox'
import ResultList from './ResultList'
import CategoryFacet from './CategoryFacet'

export const Headless = () => {
  return (
    <div>
        <SearchBox/>
        <ResultList/>
        <CategoryFacet/>
    </div>
  )
}
