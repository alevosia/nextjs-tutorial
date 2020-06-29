import { useState, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import axios from 'axios'

interface Props {
    url: string
    query: ParsedUrlQuery
    posts: any[]
}

async function fetchPosts() {
    console.log('Fetching Posts')

    const response = await axios.get('https://api.womaninaction.ph/posts')
    const posts = response.data

    return posts
}

const Wia: React.FC<Props> = ({ url, query, posts }) => {
    console.log('WIA Rendering')

    return (
        <div>
            <a href={url}>{url}</a>
            <br />
            <span>{query.name}</span>
            {
                posts.length > 0 
                    ? posts.map((post) => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <span>{post.author_name}</span>
                            <p>{post.content.substring(0, 150).concat('...')}</p>
                        </div>
                    ))
                    : 'Fetching posts...'
            }
        </div>
    )
}

export default Wia


// Server-side Rendering
// runs on the server for every request during runtime
export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
    console.log('GetServerSideProps')

    const posts = await fetchPosts()

    console.log('Posts fetched by server')
    return {
        props: {
            url: context.req.url,
            query: context.query,
            posts
        }
    }
}