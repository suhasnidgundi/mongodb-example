// Sample data
export const sampleItems = [
    { id: 1, title: "Item 1", description: "Description for Item 1" },
    { id: 2, title: "Item 2", description: "Description for Item 2" },
    { id: 3, title: "Item 3", description: "Description for Item 3" },
];

// Function to render each item
export const renderItem = (item) => (
    <>
        <p><strong>Email:</strong> {item.email}</p>
        <p><strong>Date of Birth:</strong> {item.dateOfBirth}</p>
        <p><strong>Gender:</strong> {item.gender}</p>
        <p><strong>Course:</strong> {item.course}</p>
        <p><strong>Address:</strong> {item.address}</p>
    </>
);

// Function to extract a unique key for each item
export const keyExtractor = (item) => item.id;