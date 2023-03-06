import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { CldImage, CldUploadWidget } from 'next-cloudinary'

const inter = Inter({ subsets: ['latin'] })

const PAISAJE_BACKGROUNDS = [
  {
    id: 'cloudinary-project/cielo-colorido_y7ja9i',
    title: 'Cielo Colorido',
    width: 800,
    height: 600,
  },
  {
    id: 'cloudinary-project/siluetas-arboles_snqil1',
    title: 'Siluetas Arboles',
    width: 800,
    height: 600,
  },
  {
    id: 'cloudinary-project/Lago-hallstat_xqxufd',
    title: 'Lago hallstat',
    width: 800,
    height: 600,
  },
  {
    id: 'cloudinary-project/puesta-sol_od3zyq',
    title: 'Puesta de sol',
    width: 800,
    height: 600,
  },
  {
    id: 'cloudinary-project/paisaje-rocos_h1w7rz',
    title: 'Paisaje Rocoso',
    width: 800,
    height: 600,
  },
  {
    id: 'cloudinary-project/cielo-estrellado_mojttd',
    title: 'Cielo Estrellado',
    width: 800,
    height: 600,
  },
  {
    id: 'cloudinary-project/olas_sg1unz',
    title: 'Olas mar',
    width: 800,
    height: 600,
  },
]

export default function Home() {
  const [topText, setTopText] = useState('Cloudinary Project')
  const [bottomText, setBottomText] = useState('Bot lane')
  const [background, setBackground] = useState(PAISAJE_BACKGROUNDS[0].id)

  const [grayscal, setOnGrayscale] = useState(false)
  const [blured, setOnBlur] = useState(false)
  const [tinted, setOnTint] = useState(false)
  const [pixelated, setOnPixelate] = useState(false)
  const [oppacity, setOnOpacity] = useState('100')
  const [zoomed, setOnZoom] = useState(false)

  function handleOnTopTextChange(e) {
    setTopText(e.currentTarget.value)
  }
  function handleOnBottomTextChange(e) {
    setBottomText(e.currentTarget.value)
  }
  function handleOnBackgroundChange(id) {
    setBackground(id)
  }
  function handleOnBackgroundUpload(result) {
    setBackground(result.info.public_id)
  }


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.center}>
          <div>
            <div className={styles.cardsImages}>
              <ul className={styles.backgrounds}>
                {PAISAJE_BACKGROUNDS.map(({ id, title, width, height }) => {
                  return (
                    <li key={id} className={styles.imageCards} onClick={() => { handleOnBackgroundChange(id) }}>
                      <CldImage
                        src={id}
                        alt={title}
                        width={width}
                        height={height}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>

            <div>
              <CldUploadWidget uploadPreset="cloudinary-project-bg" onUpload={handleOnBackgroundUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return (
                    <button onClick={handleOnClick}>
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </div>


            {/* BUTTONS EFFECTS */}

            <div className={styles.buttons1}>
              <button className={styles.buttons} onClick={() => { setOnGrayscale(!grayscal) }}>Grayscale</button>

              <button className={styles.buttons} onClick={() => { setOnBlur('800') }}>Blur</button>
              <button className={styles.buttons} onClick={() => { setOnBlur(false) }}>Restore Blur</button>

              <button className={styles.buttons} onClick={() => { setOnTint('equalize:80:blue:blueviolet') }}>Tint</button>
              <button className={styles.buttons} onClick={() => { setOnTint(false) }}>Restore color</button>

              <button className={styles.buttons} onClick={() => { setOnOpacity('50') }}>Opacity</button>
              <button className={styles.buttons} onClick={() => { setOnOpacity('100') }}>Restore Opacity</button>

              <button className={styles.buttons} onClick={() => { setOnZoom('loop') }}>Zoom & pan</button>
              <button className={styles.buttons} onClick={() => { setOnZoom(false) }}>Restore Zoom</button>

              <button className={styles.buttons} onClick={() => { setOnPixelate(!pixelated) }}>Pixelate</button>

            </div>
          </div>



          <div className={styles.image}>

            {/* INPUTS */}
            <div className={styles.containerInputs}>
              <div className={styles.inputOne} >
                <label className={styles.labelOne}>Top Text: </label>
                <input type='text' name='top-text' onChange={handleOnTopTextChange} />
              </div>
              <div className={styles.inputTwo}>
                <label className={styles.labelOne}>Bot Text: </label>
                <input type='text' name='bottom-text' onChange={handleOnBottomTextChange} />
              </div>
            </div>

            {/* BACKGROUND IMAGES */}
            <CldImage
              src={background}
              width='320'
              height='320'
              // crop='fill'
              grayscale={grayscal}
              blur={blured}
              pixelate={pixelated}
              opacity={oppacity}
              zoompan={zoomed}
              tint={tinted}
              alt='jugg will blade ur face'
              overlays={[
                {
                  width: 2670 - 20,
                  crop: 'fit',
                  position: {
                    x: 0,
                    y: 20,
                    gravity: 'north',
                  },
                  text: {
                    color: 'white',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 40,
                    fontWeight: 'bold',
                    text: topText,
                    stroke: true,
                    border: '8px_solid_black'
                  }
                },
                {
                  width: 2670 - 20,
                  crop: 'fit',
                  position: {
                    x: 0,
                    y: 20,
                    gravity: 'south',
                  },
                  text: {
                    color: 'yellow',
                    fontFamily: 'Source Sans Pro',
                    fontSize: 40,
                    fontWeight: 'bold',
                    text: bottomText,
                    stroke: true,
                    border: '8px_solid_black'
                  }
                }
              ]}
            />

          </div>
        </div>
      </main>
    </>
  )
}
