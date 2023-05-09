import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Status } from "@prisma/client";
import Router from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  let recent = await prisma.book.findMany({
    where: { status: "HAS_SEEN" },
  });
  recent = recent.sort(function compare(a,b){return b.createdAt?.valueOf() - a.createdAt?.valueOf()});

  const toRead = await prisma.book.findMany({
    where: { status: "TO_WATCH" },
  });
  return {
    props: { recent, toRead },
    revalidate: 10,
  };
};

type Props = {
  recent: PostProps[];
  toRead: PostProps[];
};

const Home: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const status = Status.TO_WATCH;

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, status };
      await fetch("/api/media/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="recent">
        <h1>Recent</h1>
        <main>
          {props.recent.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <div className="add">
        <h1>To Read</h1>
        <main>
          <div>
            <form onSubmit={submitData}>
              <h2>Add a new book</h2>
              <input
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                type="text"
                value={title}
              />
              <br></br>
              <input disabled={!title} type="submit" value="Add" />
              <a className="back" href="#" onClick={() => Router.push("/")}>
                or Cancel
              </a>
            </form>
          </div>
          <div>
            {props.toRead.map((post) => (
              <div key={post.id} className="post">
                <Post post={post} />
              </div>
            ))}
          </div>
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
  );
};

export default Home;
