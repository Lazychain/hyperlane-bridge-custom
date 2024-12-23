import Image from 'next/image';
import { useState } from 'react';

import { IconButton } from '../buttons/IconButton';
import { config } from '../../consts/config';
import InfoCircle from '../../images/icons/info-circle.svg';
import XCircle from '../../images/icons/x-circle.svg';
import { Card } from '../layout/Card';

export function TipCard() {
  const [show, setShow] = useState(config.showTipBox);
  if (!show) return null;
  return (
    <Card className="border_container_card  sm:w-[31rem]">
      <h2 className="text-blue-500 sm:text-lg">
        {`To bridge ECLIP from Neutron, you'll need $TIA for gas.`}
      </h2>
      <div className="mt-1 flex items-end justify-between">
        <p className="text-xs sm:text-sm max-w-[70%]">Bridging TIA to Manta? See the guide</p>
        <a
          href="https://web3godot.notion.site/Bridging-TIA-to-Manta-Pacific-0d8edccead804255a6f06d838b80d13d"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 px-3 py-1.5 flex items-center bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-xs sm:text-sm text-blue-500 rounded-full transition-all"
        >
          <Image src={InfoCircle} width={16} alt="" />
          <span className="ml-1.5">Guide</span>
        </a>
      </div>
      <div className="absolute right-3 top-3">
        <IconButton
          imgSrc={XCircle}
          onClick={() => setShow(false)}
          title="Hide tip"
          classes="hover:rotate-90"
        />
      </div>
    </Card>
  );
}
