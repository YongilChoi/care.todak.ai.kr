import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import Signup from './pages/Signup';
import StudentRecords from './pages/StudentRecords';
import VoiceToText from './pages/VoiceToText';
import Introduction from './pages/Introduction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<RefundPolicy />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-records" element={<StudentRecords />} />
        <Route path="/voice-to-text" element={<VoiceToText />} />
      </Routes>
    </Router>
  );
}

export default App;
