import { useEffect, useState } from 'react';
import './App.css';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

function App() {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    fetch('/api/expenses/total-spent')
      .then((res) => res.json())
      .then(({ total }) => setTotalSpent(total));
  }, []);

  return (
    <Card className="w-[350px] m-auto">
      <CardHeader>
        <CardTitle>Total Spent:</CardTitle>
        <CardDescription>The total amount you've spent.</CardDescription>
      </CardHeader>
      <CardContent>{totalSpent}</CardContent>
    </Card>
  );
}

export default App;
