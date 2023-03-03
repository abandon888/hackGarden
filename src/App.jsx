import {  Routes, Route,unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Layout from './pages/layout'
import './App.css'
import { AuthComponent } from './components/AuthComponent'
import Publish from './pages/Publish'
import Article from './pages/Article'
import { history } from './utils/history'
//@是路径的简写

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Routes>
          {/* 这里的Layout需要鉴权处理 */}
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }>
            <Route index element={<Home />}></Route>
            <Route path="article" element={<Article />}></Route>
            <Route path="publish" element={<Publish />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
