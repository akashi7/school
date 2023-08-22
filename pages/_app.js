import { useEffect } from 'react'
import 'antd/dist/antd.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import NProgress from 'nprogress'
import { store } from '../lib/redux/store'
import '../styles/globals.scss'
import { AppLoader } from '../components/Shared/Loaders'
import { _ns_token_ } from '../config/constants'
import { GoogleOAuthProvider } from '@react-oauth/google'
const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
  loading: () => <AppLoader />,
})
