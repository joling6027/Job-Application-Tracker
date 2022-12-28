import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { FormControl,InputLabel, Select, Paper } from '@mui/material'
import PageWithJSbasedForm from './js-form'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1 className={styles.title}>Enter The Job You Just Applied</h1>
      {/* <p className={styles.text}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga voluptatibus, aliquam accusamus incidunt soluta nisi vero repudiandae blanditiis asperiores unde aut laudantium sint nesciunt facilis ab impedit error, consectetur quidem.</p> */}
      <PageWithJSbasedForm />
    </div>
  )
}
