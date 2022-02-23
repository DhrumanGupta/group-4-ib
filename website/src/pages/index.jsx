import MetaDecorator from '../components/Utils/MetaDecorator'

export default function Home() {
  return (
    <main className={'flex grow items-center justify-center'}>
      <MetaDecorator title={'Welcome'} description={'Home group-4'} />
      <h1 className={'sr-only'}>Welcome to our group 4 project!</h1>
      <h2
        className={
          'font-display font-bold text-2xl text-center md:text-4xl lg:text-5xl max-w-[80%]'
        }
      >
        We make your packages
        <span className={'text-green-500'}> safer </span>and
        <span className={'text-yellow-500'}> convenient</span>
      </h2>
    </main>
  )
}
