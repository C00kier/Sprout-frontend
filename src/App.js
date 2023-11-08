import {
  RouterProvider,
  Route,
  Outlet,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';
import React, { useState } from 'react';

import './App.css';

//constants
import PAGES from './constants/pages';

//components
import Navbar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';

//pages
import HomePage from './pages/Home/main/HomePage';
import HomePageLogged from "./pages/Home/loggedUser/HomePageLogged";
import PageNotFound from './pages/PageNotFound/PageNotFound';
import AboutPage from './pages/About/AboutPage';
import SearchPlantPage from './pages/SearchPlant/SearchPlantPage';
import RegisterPage from './pages/Register/RegisterPage';
import LoginPage from './pages/Login/LoginPage';
import ContactPage from './pages/Contact/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy/PrivacyPolicyPage';
import TermsPage from './pages/Terms/TermsPage';
import BlogPage from './pages/Blog/BlogPage';
import ForumPage from './pages/Forum/ForumPage';
import PlantPage from './pages/Plant/PlantPage';

//utils
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path={PAGES.HOME}
          element={
            <>
              <nav>
                <Navbar />
              </nav>
              <main>
                <Outlet />
              </main>
              <footer>
                <Footer />
              </footer>
            </>
          }>
          <Route index element={isAuthenticated ? <HomePageLogged /> : <HomePage />} />
          <Route path={PAGES.ABOUT} element={<AboutPage />} />
          <Route path={PAGES.SEARCH} element={<SearchPlantPage />} />
          <Route path={PAGES.REGISTER} element={<RegisterPage />} />
          <Route path={PAGES.LOGIN} element={<LoginPage />} />
          <Route path={PAGES.CONTACT} element={<ContactPage />} />
          <Route path={PAGES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
          <Route path={PAGES.TERMS} element={<TermsPage />} />
          <Route path={PAGES.PLANT} element={<PlantPage />} />
          <Route path={PAGES.UNASSIGNED} element={<PageNotFound />} />
          <Route path={PAGES.BLOG} element={<BlogPage />} />
          <Route element={<PrivateRoutes isAuthenticated={isAuthenticated} />} >
            <Route path={PAGES.FORUM} element={<ForumPage />} />
          </Route>
        </Route>
      </>
    )
  )

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
