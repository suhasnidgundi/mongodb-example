import CardList from '@/components/CardList/CardList';
import { keyExtractor, renderItem } from '@/components/CardList/CardListDemoData';

export const metadata = {
  title: "List Of Submitted Forms",
  description: "View all submitted forms in an accordion layout",
};

export default async function SubmittedForms() {
  let submittedForms = await fetch('http://localhost:3000/api/form', { cache: 'no-store' });
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