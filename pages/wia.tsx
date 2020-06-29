import { GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'

interface Props {
    url: string
    query: ParsedUrlQuery
}

const Wia = ({ url, query }: Props) => {
    console.log('WIA Rendering')
    return (
        <div>
            <a href={url}>{url}</a>
            <br />
            <span>{query.name}</span>
        </div>
    )
}

export default Wia


// Server-side Rendering
// runs on the server for every request during runtime
export const getServerSideProps: GetServerSideProps<Props> = async(context) => {
    console.log('GetServerSideProps')
    return {
        props: {
            url: context.req.url,
            query: context.query
        }
    }
}