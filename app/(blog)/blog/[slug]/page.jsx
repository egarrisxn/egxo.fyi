import Link from 'next/link'
import Image from 'next/image'
import {format} from 'date-fns'
import {client, urlFor} from '../../../../lib/sanityClient'
import {Button} from '../../../../components/ui/button'
import {PortableText} from '@portabletext/react'

async function getData(slug) {
  const query = `
*[_type == 'blog' && slug.current == '${slug}'] {
  "currentSlug": slug.current,
  title,
  content,
  coverImage,
  publishedAt
}[0]`

  const data = await client.fetch(query)
  return data
}

export default async function BlogPost({params}) {
  // Await params to make sure it's ready
  const {slug} = await params

  const data = await getData(slug)

  return (
    <main className='mx-auto mt-8 max-w-6xl px-1 sm:px-4'>
      <nav className='mb-8'>
        <Link href='/' className='hover:text-green-400'>
          ← Home
        </Link>
      </nav>
      <article>
        <header>
          <h2 className='block text-center text-xs font-semibold uppercase tracking-wide text-primary sm:text-base 2xl:text-lg'>
            Spend a little time inside my head.
          </h2>
          <h3 className='mb-1 mt-3 block text-center text-2xl font-bold leading-8 tracking-tight sm:text-3xl lg:text-4xl 2xl:text-5xl'>
            {data.title}
          </h3>
          <p className='font-semiboldd text-center text-xs tracking-wide sm:text-base 2xl:text-lg'>
            {format(new Date(data.publishedAt), 'EEEE // MMMM dd yyyy')}
          </p>
        </header>
        <figure>
          <Image
            src={urlFor(data.coverImage).url()}
            alt='image'
            width={940}
            height={420}
            className='mx-auto mt-8 rounded-lg border object-cover shadow shadow-green-500'
          />
        </figure>
        <div className='prose prose-lg prose-blue mx-auto mt-12 max-w-[800px] xl:prose-xl 2xl:prose-2xl dark:prose-invert prose-a:text-primary prose-li:marker:text-primary'>
          <PortableText value={data.content} />
        </div>
        <Button
          asChild
          variant='secondary'
          className='mx-auto my-12 flex w-80 lg:w-80 xl:w-96 2xl:w-[32rem]'
        >
          <Link href='/'>Return</Link>
        </Button>
        <div className='mx-auto my-12 w-fit rounded-lg border p-6 text-center text-foreground shadow xl:p-12 2xl:p-16 2xl:text-xl'>
          If you would like to support my work,
          <br />
          <a
            href='https://www.buymeacoffee.com/egarrisxn'
            target='_blank'
            rel='noopener noreferrer'
            className='text-foreground no-underline'
          >
            consider buying me a{' '}
            <span className='text-green-400 no-underline hover:text-green-600'>coffee!</span>
          </a>
        </div>
      </article>
    </main>
  )
}
