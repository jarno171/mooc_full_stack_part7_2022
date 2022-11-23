import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import LogoutBar from './LogoutBar'

const NavigationBar = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoutBar />} />
      </Routes>
    </Router>
  )
}

export default NavigationBar