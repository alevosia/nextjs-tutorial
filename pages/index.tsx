import { useState } from 'react'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

import { getSortedPostsData } from '../lib/posts'

// types
import { GetStaticProps } from 'next'

export default function Home({ allPostsData }) {

    const [count, setCount] = useState(0)

    function increment() {
        console.log('Increment')
        setCount(prev => prev + 1)
    }

    function decrement() {
        console.log('Decrement')

        setCount(prev => prev - 1)
    }

    console.log('Generating!')

    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hi I'm Alex, a web developer.</p>
                <p>
                (This is a sample website - you’ll be building a site like this on{' '}
                <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, title }) => (
                    <li className={utilStyles.listItem} key={id}>
                        <Link href="/posts/[id]" as={`/posts/${id}`}>
                            <a>{title}</a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </small>
                    </li>
                ))}
                </ul>
            </section>
            <section>
                <div id="count">{count}</div>
                <button onClick={increment}>INCREMENT</button>
                <button onClick={decrement}>DECREMENT</button>
                <Link href="/wia">
                    <a>WIA</a>
                </Link>
            </section>
        </Layout>
    )
}

// Static Generation (Recommended)
// only runs on the server during build time
// but runs for every request during development
export const getStaticProps: GetStaticProps = async () => {
    const allPostsData = getSortedPostsData()
    console.log('Getting static props...')
    return {
        props: {
            allPostsData
        }
    }
}

// Server-side Rendering
// runs on the server for every request
// export async function getServerSideProps(context) {
//     return {
//       props: {
//         // props for your component
//       }
//     }
// }
