import './App.css'
import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddServiCardSkeleton } from './skeletons/AddServiCardSkeleton'
import { HomeSkeleton } from './skeletons/HomeSkeleton'
import { NotFound404 } from './pages/NotFound404'
const Home = lazy(() => import('./pages/Home'))
const AddCardServi = lazy(() => import('./pages/AddCardServi'))

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense fallback={<HomeSkeleton />}><Home /></Suspense>} />
        <Route path='/add-card-servi' element={<Suspense fallback={<AddServiCardSkeleton />}><AddCardServi /></Suspense>} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
