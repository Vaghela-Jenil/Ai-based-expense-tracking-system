import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { getAccountWithTransaction } from '@/actions/account'
import { notFound } from 'next/navigation';
import React from 'react'
import TransactionTable from "../_components/transaction-table";
import AccountChart from "../_components/account-chart";

const AccountPage = async ({ params }) => {
  const { id } = params; // destructure safely
  const accountData = await getAccountWithTransaction(id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;

  return (
    <div className='px-10 space-y-8'>
        <div className="flex gap-4 items-end justify-between">
      <div>
        <h1 className='text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize'>{account.name}</h1>
        <p className='text-muted-foreground px-2'>{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
      </div>

      <div className='text-right pb-2'>
        <div className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</div>
        <p className='text-sm text-muted-foreground'>{account._count.transactions} Transactions</p>
      </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transaction table */}
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
        >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
};

export default AccountPage;
