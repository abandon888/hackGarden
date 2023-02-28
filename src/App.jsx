import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Layout from './pages/layout'
import './App.css'
import { AuthComponent } from './components/AuthComponent'
import Publish from './pages/Publish'
import Article from './pages/Article'
//@是路径的简写

function App() {
  return (
    <BrowserRouter>
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
            {/* <Route index element={<Home />}></Route> */}
            <Route path="article" element={<Article />}></Route>
            <Route path="publish" element={<Publish />}></Route>
          </Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
