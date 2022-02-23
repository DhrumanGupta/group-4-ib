import MetaDecorator from '../components/Utils/MetaDecorator'
import { Fragment } from 'react'

const data = [
  {
    heading: 'Fundamentally Different',
    content:
      'Using a decentralized network of warehouses and employees, we aim to make your deliveries smoother. All packages are thoroughly sanitized with our own in-house sanitizer to give you to most secure and safe experience. We aim to reimagine the way deliveries are done amidst this pandemic.',
  },
  {
    heading: 'Better Packaging',
    content:
      'Through scientific research and experiments, we have found the ideal packaging to prevent rain and impact damage to your goods.',
  },
  {
    heading: 'Environmentally Friendly',
    content: 'By conducting thorough experiments, we have come up with the best possible solution for making packages with a low carbon footprint. We use biodegradable or recyclable materials to make packages environmentally friendly, and do our best to sustain it.',
  },
  {
    heading: 'Regular Updates',
    content: 'Due to the decentralized nature of our packaging system, you stay updated on every micro event making it safer and reliable, so you can set back and relax!'
  }
]

export default function Home() {
  return (
    <main className={'flex grow flex-col'}>
      <MetaDecorator title={'Welcome'} description={'Home group-4'} />
      <h1 className={'sr-only'}>Welcome to our group 4 project!</h1>
      <section
        className={
          'flex grow items-center justify-center flex-col min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] h-full'
        }
      >
        <h2
          className={
            'font-display font-bold text-2xl text-center md:text-4xl lg:text-5xl max-w-[80%] md:max-w-[70%] lg:max-w-[60%]'
          }
        >
          With
          <span className={'text-emerald-500'}> safer </span>and
          <span className={'text-orange-500'}> convenient </span>
          packages,
          <span className={'text-blue-500'}>
            {' '}
            you are bound to be satisfied
          </span>
          .
        </h2>
        <a
          href={'#how'}
          className={
            'mt-4 text-lg md:text-xl lg:text-2xl text-slate-700 font-bold underline'
          }
        >
          Learn How
        </a>
      </section>
      <section
        className={
          'min-h-screen md:max-w-screen-sm lg:max-w-screen-md mx-auto block w-[90%] md:w-full'
        }
        id={'how'}
      >
        <br />
        <br />
        {data.map((x, index) => (
          <Fragment key={index}>
            <h2 className={'font-bold text-lg md:text-xl lg:text-2xl'}>
              {x.heading}
            </h2>
            <p className={'mb-7 md:mb-7 lg:mb-8 text-base lg:text-lg'}>
              {x.content}
            </p>
            <hr className={'mb-7 md:mb-7 lg:mb-8'}/>
          </Fragment>
        ))}
      </section>
    </main>
  )
}

Home.isForAll = true
