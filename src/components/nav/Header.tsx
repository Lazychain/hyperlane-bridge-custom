import Link from 'next/link';
import Image from 'next/image';
import { WalletControlBar } from '../../features/wallet/WalletControlBar';
import Logo from '../../images/logos/logo-h.png';


interface Props {
  isSideBarOpen?: boolean;
  setIsSideBarOpen: (isSideBarOpen: boolean) => void;
}

export function Header({ isSideBarOpen = false, setIsSideBarOpen }: Props) {
  const handleHeaderClick = (e: { clientX: number; currentTarget: HTMLElement; }) => {
    const clickX = e.clientX;
    // Calculate the width in pixels (22 rem)
    const headerElement = e.currentTarget;
    const sideBarWidth = 352; // You need to set your actual sidebar width
    const headerWidth = headerElement.offsetWidth - sideBarWidth;
    console.log(typeof headerWidth);
    if (clickX >= 0 && clickX <= headerWidth && isSideBarOpen) {
      setIsSideBarOpen(false);
    }
  };
  return (
    <header
      className={`pt-5 pb-2 w-full border-b-[0.5px] ${isSideBarOpen ? 'border-white/[.5]' : 'border-white'
        } h-[96px]`}
      onClick={handleHeaderClick}
    >
      <div className="flex justify-between items-center">
        <Link href="/" className={`py-2 flex items-center ${isSideBarOpen ? 'opacity-50' : ''} `}>
          {/*<h1 style={{fontFamily:'Bungee-Shade', fontStyle:'normal', fontWeight: 400, fontSize:40, color:'white'}}>LazyChain</h1>*/}
          <Image src={Logo} height={40} alt="lazychain bridge" />
        </Link>
        <div className="flex flex-col items-end md:flex-row-reverse md:items-start gap-2">
          <WalletControlBar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        </div>
      </div>
    </header>

  );
}
