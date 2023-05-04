import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import { Status, BookCategory } from '@prisma/client';

const Draft: React.FC = () => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState<Status>(Status.HAS_SEEN);
    const [category, setCategory] = useState<BookCategory>(BookCategory.ACTION_ADVENTURE);

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { title, status, category };
            await fetch('/api/media/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await Router.push('/drafts');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div>
                <form onSubmit={submitData}>
                    <h1>Add a new book</h1>
                    <input
                        autoFocus
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        type="text"
                        value={title}
                    />
                    <div>
                        <input type="radio" name="status" onChange={(e) => setStatus(Status.HAS_SEEN)} value={Status.HAS_SEEN} defaultChecked /> Read
                        <input type="radio" name="status" onChange={(e) => setStatus(Status.TO_WATCH)} value={Status.TO_WATCH} /> To Read
                    </div>
                    <label>
                        Category:
                        <select name="category">
                            <option value={BookCategory.ACTION_ADVENTURE} onChange={(e) => setCategory(BookCategory.ACTION_ADVENTURE)} >Action & Adventure</option>
                            <option value={BookCategory.BIOGRAPHIES} onChange={(e) => setCategory(BookCategory.BIOGRAPHIES)} >Biographies</option>
                            <option value={BookCategory.CHILDRENS} onChange={(e) => setCategory(BookCategory.CHILDRENS)} >Children's</option>
                        </select>
                    </label>
                    <br></br>
                    <input disabled={!title} type="submit" value="Add" />
                    <a className="back" href="#" onClick={() => Router.push('/')}>
                        or Cancel
                    </a>
                </form>
        </div>
        <style jsx>{`
          .page {
            background: var(--geist-background);
            padding: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
  
          input[type='text'],
          textarea {
            width: 100%;
            padding: 0.5rem;
            margin: 0.5rem 0;
            border-radius: 0.25rem;
            border: 0.125rem solid rgba(0, 0, 0, 0.2);
          }
  
          input[type='submit'] {
            background: #ececec;
            border: 0;
            padding: 1rem 2rem;
          }
  
          .back {
            margin-left: 1rem;
          }
        `}</style>
      </Layout>
    );
  };
  
  export default Draft;