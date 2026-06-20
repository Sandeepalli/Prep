import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ConceptTrackPage from './pages/ConceptTrackPage'
import SystemDesignPage from './pages/SystemDesignPage'
import CodingPage from './pages/CodingPage'
import BehavioralPage from './pages/BehavioralPage'
import FlashcardsPage from './pages/FlashcardsPage'
import QuizzesPage from './pages/QuizzesPage'
import PlaygroundPage from './pages/PlaygroundPage'
import InterviewPrepPage from './pages/InterviewPrepPage'

import * as javascript from './data/javascript'
import * as react from './data/react'
import * as webPlatform from './data/webPlatform'
import * as nodejs from './data/nodejs'
import * as stateManagement from './data/stateManagement'
import * as testing from './data/testing'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route
          path="/javascript"
          element={<ConceptTrackPage trackId="javascript" sections={javascript.sections} tips={javascript.jsTips} />}
        />
        <Route
          path="/react"
          element={<ConceptTrackPage trackId="react" sections={react.sections} tips={react.reactTips} />}
        />
        <Route
          path="/web-platform"
          element={<ConceptTrackPage trackId="web-platform" sections={webPlatform.sections} tips={webPlatform.webTips} />}
        />
        <Route
          path="/nodejs"
          element={<ConceptTrackPage trackId="nodejs" sections={nodejs.sections} tips={nodejs.nodeTips} />}
        />
        <Route
          path="/state-management"
          element={<ConceptTrackPage trackId="state-management" sections={stateManagement.sections} tips={stateManagement.tips} />}
        />
        <Route
          path="/testing"
          element={<ConceptTrackPage trackId="testing" sections={testing.sections} tips={testing.tips} />}
        />

        <Route path="/system-design" element={<SystemDesignPage />} />
        <Route path="/coding" element={<CodingPage />} />
        <Route path="/behavioral" element={<BehavioralPage />} />

        <Route path="/interview-qa" element={<InterviewPrepPage />} />

        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}
