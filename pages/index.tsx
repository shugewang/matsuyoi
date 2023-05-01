import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"

export const getStaticProps: GetStaticProps = async () => {
  const feed = [
    {
      id: "1",
      title: "The Satsuma Complex",
      description: "My name is Gary. I'm a thirty-year-old legal assistant with a firm of solicitors in London. To describe me as anonymous would be unfair but to notice me other than in passing would be a rarity. I did make a good connection with a girl, but that blew up in my face and smacked my arse with a fish slice.",
      author: "Bob Mortimer",
      publication_year: 2022,
      genre: "Comedy",
    },
  ]
  return { 
    props: { feed }, 
    revalidate: 10 
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
