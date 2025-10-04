import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';

import type { Article } from '../types';
import { db } from './firebaseClient';

const articlesCollection = collection(db, 'articles');
const articlesQuery = query(articlesCollection, orderBy('createdAt', 'desc'));

type ArticleListener = (articles: Article[]) => void;
type ErrorListener = (error: Error) => void;

const mapDocToArticle = (snapshot: QueryDocumentSnapshot<DocumentData>): Article => {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    title: data.title,
    author: data.author,
    date: data.date,
    imageUrl: data.imageUrl,
    content: data.content,
    excerpt: data.excerpt,
  };
};

export const subscribeToArticles = (onData: ArticleListener, onError?: ErrorListener): Unsubscribe =>
  onSnapshot(
    articlesQuery,
    (snapshot) => {
      const articles = snapshot.docs.map(mapDocToArticle);
      onData(articles);
    },
    (error) => onError?.(error as Error)
  );

export const saveArticle = async (article: Article): Promise<void> => {
  const docRef = doc(articlesCollection, article.id);
  const payload = {
    ...article,
    createdAt: Timestamp.now(),
  };
  await setDoc(docRef, payload);
};
