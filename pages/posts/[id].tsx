import Head from 'next/head'
import Layout from '../../components/layout'

import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'

import { GetStaticProps, GetStaticPaths } from 'next'

const Post = ({ postData }) => (
    <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
)

// runs for every request during development
// only runs on the server during build time
export const getStaticPaths: GetStaticPaths = async() => {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

// runs for every request during development
// only runs on the server during build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params)
    const postData = await getPostData(params.id as string)
    return {
        props: {
            postData
        }
    }
}

export default Post