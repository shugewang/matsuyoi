import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Book, { BookProps } from "../components/Book";
import prisma from "../lib/prisma";
import { Status } from "@prisma/client";
import Router from "next/router";
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';


export const getStaticProps: GetStaticProps = async () => {
  let read = await prisma.book.findMany({
    where: { status: "HAS_SEEN" },
  });
  // recent = recent.sort(function compare(a,b){return b.createdAt?.valueOf() - a.createdAt?.valueOf()});
  let toRead = await prisma.book.findMany({
    where: { status: "TO_WATCH" },
  });

  let recentReadByDate = read.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
  let toReadByDate = toRead.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );

  return {
    props: {
      recent: JSON.parse(JSON.stringify(recentReadByDate)),
      toRead: JSON.parse(JSON.stringify(toReadByDate)),
    },
    revalidate: 10,
  };
};

type Props = {
  recent: BookProps[];
  toRead: BookProps[];
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
      // await Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className={utilStyles.centered}>
          <Image
              priority
              src="/images/logo.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt="logo"
            />
      </div>
      <div className="recent">
        <h1>Recent</h1>
        <main>
          {props.recent.map((book) => (
            <div key={book.id} className="book">
              <Book book={book} />
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
            {props.toRead.map((book) => (
              <div key={book.id} className="book">
                <Book book={book} />
              </div>
            ))}
          </div>
        </main>
      </div>

      <style jsx>{`
        .book {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .book:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .book + .book {
          margin-top: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Home;
