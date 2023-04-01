import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { FormControl,InputLabel, Select, Paper } from '@mui/material'
import EnterJobApplicationForm from './js-form'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Job Application Tracker - Home</title>
      </Head>
      <h1 className={styles.title}>Enter The Job You Just Applied</h1>
      <EnterJobApplicationForm />
    </div>
  )
}
