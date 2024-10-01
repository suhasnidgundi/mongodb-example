"use client"

import { useState, useEffect } from 'react';
import CardList from '@/components/CardList/CardList';
import { keyExtractor, renderItem } from '@/components/CardList/CardListDemoData';

export default function SubmittedForms() {
  const [forms, setForms] = useState([]);

  const fetchForms = async () => {
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://mongodb-example-alpha.vercel.app';

    let submittedForms = await fetch(`${baseUrl}/api/form`, { cache: 'no-store' });
    let data = await submittedForms.json();
    setForms(data);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Submitted Forms</h1>
      <CardList
        items={forms}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onUpdate={fetchForms}
        onDelete={fetchForms}
      />
    </div>
  );
}