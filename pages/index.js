import Head from 'next/head'
import styles from '../styles/home.module.css'
import EnterJobApplicationForm from './js-form'

export default function Home() {
  return (
    <>
      <Head>
        <title>Job Application Tracker - Home</title>
      </Head>
      {/* <div className={styles.}></div> */}
      <h1 className={styles['home-title']}>Enter The Job You Just Applied</h1>
      <EnterJobApplicationForm />
    </>
  )
}
