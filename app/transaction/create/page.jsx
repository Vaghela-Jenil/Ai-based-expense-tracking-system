import { Suspense } from "react";
import { getAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories"
import AddTransactionForm from "../_components/transaction-format";
import { getTransaction } from "@/actions/transaction";

// Allow ISR (revalidate every 60 seconds) instead of force-dynamic
export const revalidate = 60;

function FormSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-5 mt-20">
      <div className="flex justify-center md:justify-normal mb-8">
        <div className="h-12 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="space-y-6">
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
}

async function TransactionFormContent({ searchParams }) {
  const accounts = await getAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  return (
    <div className="max-w-3xl mx-auto px-5 mt-20">
      <div className="flex justify-center md:justify-normal mb-8">
        <h1 className="text-5xl gradient-title ">
          {editId ? "Edit" : "Add"} Transaction
        </h1>
      </div>
      <AddTransactionForm
        accounts={accounts}
        categories={defaultCategories}
        editMode={!!editId}
        initialData={initialData}
      />
    </div>
  );
}

export default async function AddTransactionPage({ searchParams }) {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <TransactionFormContent searchParams={searchParams} />
    </Suspense>
  );
}
