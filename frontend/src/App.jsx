import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LayoutPage from './pages/LayoutPage'
import DashboardPage from './pages/DashboardPage'
import WriteArticlePage from './pages/WriteArticlePage'
import BlogTitlesPage from './pages/BlogTitlesPage'
import GenerateImagesPage from './pages/GenerateImagesPage'
import RemoveBgPage from './pages/RemoveBgPage'
import ReviewResumePage from './pages/ReviewResumePage'
import CommunityPage from './pages/CommunityPage'
import RemoveObjectPage from './pages/RemoveObjectPage'
import { useAuth } from '@clerk/react'
import { useEffect } from 'react'


function App() {

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log("User Token:", token)).catch((err) => console.error("Error getting token:", err));
  }, [])
  return (
    <div>

      <Routes >
        <Route path='/' element={<HomePage />} />
        <Route path='/ai' element={<LayoutPage />} >
          <Route index element={<DashboardPage />} />
          <Route path='write-article' element={<WriteArticlePage />} />
          <Route path='blog-titles' element={<BlogTitlesPage />} />
          <Route path='generate-images' element={<GenerateImagesPage />} />
          <Route path='remove-background' element={<RemoveBgPage />} />
          <Route path='remove-object' element={<RemoveObjectPage />} />
          <Route path='review-resume' element={<ReviewResumePage />} />
          <Route path='community' element={<CommunityPage />} />

        </Route>
        {/* <Route path='/' element={ } /> */}




      </Routes>


    </div>
  )
}

export default App