import React, { useState, useEffect, CSSProperties, useRef, useContext, MutableRefObject } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper';
import styles from '../styles/Home.module.scss'
import 'swiper/css/free-mode'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation';
import 'swiper/css';
import Card from './card';
import axios from 'axios';
import { DataSource, ResponseGetListProduct } from '../interfaces/interface/interface.respose';
import { NextPage } from 'next';
import Image from 'next/image';
import { StoreContext } from '../pages/_app';

interface Props {
  dataProps?: DataSource[];
  title: string;
  style?: CSSProperties;
  page?:number;
  sequenceItem?: number | string;
  getTheIntersection?: (isIntersecting: boolean, key: number | string) => void;
  handleViewCatalog?: () => void;
  refCatalog?: (ref: MutableRefObject<null | HTMLInputElement>) => void
}

const ListMerchandise:NextPage<Props> = ({ dataProps, title, style, page = 1, getTheIntersection, sequenceItem, refCatalog }) => {

  const containerRef = useRef<null | HTMLInputElement>(null)
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  }

  const {
    stateContext,
    actions: { actionSetTriggerViewCatalog },
  } = useContext(StoreContext);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    if(getTheIntersection && sequenceItem) getTheIntersection(entry.isIntersecting, sequenceItem)
  }

  const [listData, setListData] = useState<DataSource[]>([])
  const [titleList, setTitleList] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(title === 'Catalog' && stateContext.trigger && refCatalog) {
      actionSetTriggerViewCatalog(false)
      refCatalog(containerRef)
    }
  }, [stateContext.trigger])

  const getListMerchandise = () => {
    const params = {
      page,
      limit: 8
    }
    if(!dataProps) {
      setLoading(true)
      axios.get('https://safe-sands-27964.herokuapp.com/merchandises', { params })
      .then(({ data }:{ data: ResponseGetListProduct }) => {
        const tempData:DataSource[] = data.data.map((dataMap) => {
          return { 
            id: dataMap.id,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus delectus pariatur ex commodi provident quos consequatur unde, quam ducimus reprehenderit error eum, architecto eius. Quod rem perferendis odio excepturi voluptatibus?',
            imageUrl: dataMap.imageUrl,
            tags: dataMap.Tag.name,
            title: dataMap.name,
            price: dataMap.sellingPrice
          }
        }).filter((dataFilter, index) => index < 8)
        setListData(tempData)
      })
      .catch(() => getListMerchandise())
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
    }
  }

  useEffect(() => getListMerchandise(), [])

  useEffect(() => {
    if(dataProps && dataProps.length > 0) {
      setListData(dataProps)
    }
  }, [dataProps])

  useEffect(() => {
    if(title) setTitleList(title)
  }, [title])

  useEffect(() => {
    const observer = new IntersectionObserver((callback) => handleIntersection(callback), options)
    if(containerRef.current) observer.observe(containerRef.current)
    return () => {
      if(containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef, options])

  if(loading && title !== 'Catalog') return (
  <div style={{ display: 'flex', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
    <Image src={'/loading2.gif'} width={100} height={100} alt="not found" />
  </div> )

  return (
    <div className={styles['container']} style={style ? style : undefined}>
      <div className={styles['container_flex']}>
        <div className={styles['title-list']} ref={containerRef}>
          {titleList}
        </div>
        <div className={styles['see-all-list']}>
          {`See All >`}
        </div>
      </div>
      <Swiper
        style={{ paddingLeft: '10%' }}
        freeMode={{
          enabled: true,
          sticky: false,
          minimumVelocity: 0.02,
        }}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 5
          },
          // when window width is >= 640px
          660: {
            slidesPerView: 2,
            spaceBetween: 5
          },
          // // when window width is >= 980px
          980: {
            slidesPerView: 3,
            spaceBetween: 5
          },
          // // when window width is >= 1280px
          1280: {
            slidesPerView: 4,
            spaceBetween: 20
          },
        }}
        slidesPerView={4}
        modules={[FreeMode]}
      >
        {
          listData.map((dataMap, index) => {
            return (
              <SwiperSlide key={index}>
                <Card
                  id={dataMap.id}
                  key={index}
                  rate={5}
                  imageUrl={dataMap.imageUrl}
                  tags={dataMap.tags}
                  title={dataMap.title}
                  detail={false}
                  price={dataMap.price}
                />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

export default ListMerchandise