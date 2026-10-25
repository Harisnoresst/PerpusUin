import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './pages/user/LandingPage'
import AboutPage from './pages/user/AboutPage'
import HelpPage from './pages/user/HelpPage'
import LoginPage from './pages/user/LoginPage'
import SundaIslamPage from './pages/user/SundaIslamPage'
import SGDPage from './pages/user/SGDPage'
import CollectionDetailPage from './pages/user/CollectionDetailPage'
import SavedCollectionsPage from './pages/user/SavedCollectionsPage'
import AccessRequestPage from './pages/user/AccessRequestPage'
import ProfilePage from './pages/user/ProfilePage'
import ScrollToTop from './components/Scrolltotop'
import DetailBukuSundaIslam from './pages/user/DetailBukuSundaIslam'
import DeatilaSGDCorner from './pages/user/DetailSGDCorner'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/tentang"
          element={<AboutPage />}
        />

        <Route
          path="/bantuan"
          element={<HelpPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/sunda-islam"
          element={<SundaIslamPage />}
        />

        <Route
          path="/sgd-corner"
          element={<SGDPage />}
        />

        <Route
          path="/koleksi/:id"
          element={<CollectionDetailPage />}
        />

        <Route
          path="/saved"
          element={<SavedCollectionsPage />}
        />

        <Route
          path="/request-access"
          element={<AccessRequestPage />}
        />

        <Route
          path="/profile"
          element={<ProfilePage />}
        />

        <Route path="/sunda-islam/detail/:id" 
        element={<DetailBukuSundaIslam />} />

        <Route path="/sgd-corner/detail/:id"
        element={<DeatilaSGDCorner />} />
      </Routes>
    </BrowserRouter>
  )
}