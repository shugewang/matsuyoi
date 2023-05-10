import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.book.findUnique({
    where: {
      id: String(params?.id),
    },
  });
  return {
    props: JSON.parse(JSON.stringify(book)),
  };
};

const Post: React.FC<BookProps> = (props) => {
  let title = props.title;
  // if (!props.published) {
  //   title = `${title} (Draft)`
  // }
  let date = props.createdAt;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>Added on {date}</p>
        {/* <p>By {props?.author?.name || "Unknown author"}</p> */}
        {/* <ReactMarkdown children={props.content} /> */}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
