import './App.css';
import { Routes,Route } from 'react-router-dom'
import React from 'react';

const LazyBoard = React.lazy(() => import('./component/board/Board'))
const LazyHome = React.lazy(() => import('./component/home/Home'))

function App() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Routes>
        <Route
          path='/'
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyHome />
            </React.Suspense>
          }
        />
        <Route
          path='/game'
          element={
            <React.Suspense fallback={<Loading />}>
              <LazyBoard />
            </React.Suspense>
          }
        />
      </Routes>
    </div>
  )
}

function Loading(){
  return <h1 style={{padding:"20px",fontSize:"74px",background:"white"}}>LOADING..</h1>
}

export default App;
