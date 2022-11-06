import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import Catalog from '../components/catalog'
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {

  const [listProduct, setListProduct] = useState({ list1: true, list2: false, list3: false })

  const getTheIntersection = (isIntersecting: boolean, sequenceItem: number | string):void => {
    switch(sequenceItem) {
      case 1:
        if(!listProduct.list2 && isIntersecting) setListProduct({ ...listProduct, list2: true })
        break;
      case 2:
        if(!listProduct.list3 && isIntersecting) setListProduct({ ...listProduct, list3: true })
        break;
      default:
        break
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Evermos Catalog</title>
        <meta name="description" content="Evermos Catalog" />
        <link rel="icon" href="/evermos_logo2.png" />
      </Head>
      <div className={styles.evermos_logo}>
        <Image
          layout='responsive'
          width={100}
          height={100}
          src={'/evermos_logo.png'}
          alt="logo not found"
        />
      </div>
      <div className={styles.container_welcome}>
        <div className={styles.container_image}>
          <Image
            layout="responsive"
            width={900}
            height={800}
            src={'/background-welcome.jpeg'}
            alt="not found"
          />
        </div>
        <div className={styles.container_text}>
          <p className={styles.container_title}>Be cool with your fashion</p>
          <p className={styles.container_description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error asperiores distinctio id sed eveniet voluptate sequi consectetur sit repellendus iure quibusdam quo, culpa rerum nesciunt ut iusto molestiae odio atque.</p>
          <button className={styles.container_button}>View Catalog</button>
        </div>
      </div>
      { listProduct.list1 ? <Catalog style={{ marginTop: '2.1rem' }} title='Catalog' key={1} sequenceItem={1} getTheIntersection={getTheIntersection}></Catalog> : null }
      { listProduct.list2 ? <Catalog style={{ marginTop: '2.1rem' }} key={2} sequenceItem={2} title='New Product' getTheIntersection={getTheIntersection} page={2} /> : null }
      { listProduct.list3 ? <Catalog style={{ marginTop: '2.1rem' }} title='Hot Product' key={3} sequenceItem={3} getTheIntersection={getTheIntersection}></Catalog> : null }
    </div>
  )
}
