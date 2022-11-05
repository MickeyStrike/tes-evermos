import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../styles/card.module.css'

interface Props {
  imageUrl: string,
  rate: number,
  title?: string,
  tags?: string,
  id: string,
  detail?: boolean,
  price?: number
}

const Card:React.FC<Props> = ({ imageUrl, rate, title, tags, id, detail, price }) => {

  const starRating = () => {
    const tempStar= []
    for (let i = 0; i < rate; i++) {
      tempStar.push(<>&#9733;</>)
    }
    return <>{tempStar}</>
  }

  const handleViewDetail = () => {
    Router.push(`/detail/${id}`)
  }

  return (
    <div className={styles['card']}>
      <div className={!detail ? styles['card__image-container'] : styles['card__image-container-detail']}>
        <div
          className={!detail ? styles['card-image'] : styles['card-image-detail']}
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(29, 29, 29, 0) 0%, rgba(29, 29, 29, 0.8) 80.79%),url(${imageUrl})`,
          }}
        >
        </div>
      </div>
      <div className={!detail ? styles['card__body-container'] : styles['card__body-container-detail']}>
        {
            tags ?
            <span className={styles['card-tags']}>{tags}</span>
            :
            null
        }
        <div style={{ margin: '10px 0', maxWidth: 300 }}>
          <span>
            {starRating()}
          </span>
          {
            !detail ?
            <>
              <span className={styles['card-price']}>
                {price ? `Rp ${price.toLocaleString('id-ID')}` : null}
              </span>
            </>
            :
            null
          }
        </div>
        <div className={styles['card-title']}>{title}</div>
      </div>
      {
        !detail ? 
          <div className={styles['card-view-detail']} style={{ color: 'yellow' }} onClick={handleViewDetail}>
            {`View Detail >`}
          </div>
        :
          null
      }
      
    </div>
  )
}
export default Card