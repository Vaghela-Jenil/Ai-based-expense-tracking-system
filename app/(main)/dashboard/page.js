import CreateAccountDrawer from '@/components/create-account-drawer'
import { CardContent, Card } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import { getAccounts, getDashboardData } from '@/actions/dashboard'
import AccountCard from './_components/account-card'
import React, { Suspense } from 'react'
import BudgetProgress from './_components/budget-progress'
import { getCurrentBudget } from '@/actions/bujget'
import DashboardOverview from './_components/transection-overview'


async function DashboardPage() {
     const [accounts] = await Promise.all([
    getAccounts(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  const transactions = await getDashboardData();

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

    
  return (
   <div className='px-5 space-y-8'>
    {/* Budget Progress */}
     <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />


    {/* Overview */}
    <Suspense fallback={"Loading Overview..."}>
      <DashboardOverview
      accounts={accounts}
      transactions={transactions || []}
      />
    </Suspense>

    {/* Amount grid */}
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <CreateAccountDrawer>
            <Card className='hover:shadow-md transition-shadow cursor-pointer border-dashed'>
                <CardContent className='flex flex-col items-center justify-center text-text-muted-foreground h-full pt-5'>
                    <Plus className='h-10 w-10 mb-2'/>
                    <p className='text-sm font-medium'>Add new Account</p>
                </CardContent>
            </Card>
        </CreateAccountDrawer>

       {accounts.length > 0 &&
          accounts?.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
    </div> 
   </div>
  )
}

export default DashboardPage
