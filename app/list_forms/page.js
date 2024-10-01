import CardList from '@/components/CardList/CardList';
import { keyExtractor, renderItem } from '@/components/CardList/CardListDemoData';

export const metadata = {
  title: "List Of Submitted Forms",
  description: "View all submitted forms in an accordion layout",
};

export default async function SubmittedForms() {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://mongodb-example-alpha.vercel.app';

  let submittedForms = await fetch(`${baseUrl}/api/form`, { cache: 'no-store' });
  let forms = await submittedForms.json();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Submitted Forms</h1>
      <CardList
        items={forms}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </div>
  );
}
