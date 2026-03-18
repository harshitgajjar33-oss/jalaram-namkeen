import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen">
        <nav>
          <ul>
            <li className="mb-2">
              <Link href="/admin" className="block hover:bg-gray-700 p-2 rounded">
                Dashboard
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/food-items" className="block hover:bg-gray-700 p-2 rounded">
                Food Items
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/admin/orders" className="block hover:bg-gray-700 p-2 rounded">
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
