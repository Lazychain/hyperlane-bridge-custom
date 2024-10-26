/* import { SetStateAction, useState } from 'react';

import { Card } from '../../components/layout/Card';

import { TransferTokenForm } from './TransferTokenForm';
import { TransferTokenTab } from './TransferTokenTab';

export default function TransferTokenCard() {
  const [activeTab, setActiveTab] = useState<string>('deposit');
  // Flag for if form is in input vs review mode
  const [isReview, setIsReview] = useState(false);

  const handleTabChange = (tab: SetStateAction<string>) => {
    setActiveTab(tab);
    setIsReview(false);
  };

  return (
    <Card className="w-100 relative">
      <>
        <div className="relative flex items-start justify-between z-20">
          <TransferTokenTab
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            transferType="deposit"
          />
          <TransferTokenTab
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            transferType="withdraw"
          />
        </div>
        <TransferTokenForm transferType={activeTab} isReview={isReview} setIsReview={setIsReview} />
      </>
    </Card>
  );
} */

  import { Card } from '../../components/layout/Card';

  import { TransferTokenForm } from './TransferTokenForm';

export default function TransferTokenCard (){
  return (
    <Card className="w-100 sm:w-[31rem]">
      <TransferTokenForm transferType={''} isReview={false} setIsReview={undefined} />
    </Card>
  );
}
