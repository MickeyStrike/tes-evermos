import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Card from '../../../components/card'
import Catalog from '../../../components/catalog'
import { ResponseDetailMerchandise } from '../../../interfaces/interface/interface.respose'
import styleHome from '../../../styles/Home.module.css'

const DetailMerchandise: NextPage = () => {
  const router = useRouter()
  const [dataDetail, setDataDetail] = useState<ResponseDetailMerchandise | null>(null)

  const getDetailMerchandise = () => {
    const { id } = router.query
    if(id) {
      axios.get(`https://safe-sands-27964.herokuapp.com/merchandises/${id}`)
      .then(({ data }:{ data: ResponseDetailMerchandise }) => {
        setDataDetail({ ...data, 
            imageUrl: data.imageUrl,
        })
      })
    }
  }

  useEffect(() => getDetailMerchandise(), [router])

  const goToDashboard = () => {
    Router.push('/')
  }

  const starRating = () => {
    const tempStar= []
    for (let i = 0; i < 5; i++) {
      tempStar.push(<>&#9733;</>)
    }
    return <>{tempStar}</>
  }

  return (
    <div className={styleHome['container']}>
      <Head>
        <title>Detail Product</title>
        <meta name="description" content="Detail Product" />
        <link rel="icon" href="/evermos_logo2.png" />
      </Head>

      <div className={styleHome['main']} style={{ color: 'white' }}>
        <div className={styleHome['evermos_logo']} style={{ color: 'white', cursor: 'pointer', marginBottom: '10%' }}>
          <Image layout='responsive' src='/evermos_logo.png' width={100} height={100} onClick={goToDashboard} alt="not found logo" />
        </div>
        <div className={`${styleHome['container_detail']} ${styleHome['mt-8']}`} style={{ color: 'white' }}>
          <Card
            detail={true}
            id={'12323'}
            imageUrl={dataDetail ? dataDetail.imageUrl : ''}
            rate={0}
          />
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', flexFlow: 'row wrap' }}>
            <div className={styleHome['row']} style={{ gap: '2rem' }}>
              <div className={`${styleHome['column']}`} style={{ flexGrow: 12 }}>
                <div className={`${styleHome['row']} ${styleHome['title-detail-product']}`}>
                  Detail Product
                </div>
                <div className={`${styleHome['row']} ${styleHome['body-detail-product']}`}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>Name: {dataDetail?.name}</span>
                    <span>Price: Rp {dataDetail?.sellingPrice.toLocaleString('id-ID')}</span>
                    <span>Ratings From Buyer: {starRating()}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', marginTop: '2rem' }}>
                    <span style={{ color: 'white' }}>Description:</span>
                    <p style={{ marginTop: 0 }}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non magnam nesciunt expedita eaque, saepe accusamus dolore vel error ipsa aut aspernatur dignissimos ipsum asperiores vero! Earum nulla excepturi quibusdam animi!</p>
                  </div>
                </div>
              </div>
              <div className={`${styleHome['column']}`} style={{ flexGrow: 3 }}>
                <div className={`${styleHome['row']} ${styleHome['title-tags']}`}>
                  Tags:
                </div>
                <div className={`${styleHome['column']} ${styleHome['body-tags']}`}>
                  <p style={{ margin: 0 }}>{dataDetail?.Tag.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styleHome['main']}`}>
          <Catalog title='Recommendation' />
        </div>
      </div>
    </div>
  )
}

export default DetailMerchandise