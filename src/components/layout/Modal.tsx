import { Dialog, DialogPanel, DialogTitle, TransitionChild, Transition } from '@headlessui/react';
import { Fragment, PropsWithChildren } from 'react';

import XCircle from '../../images/icons/x-circle.svg';
import { IconButton } from '../buttons/IconButton';

export function Modal({
  isOpen,
  title,
  close,
  width,
  padding,
  children,
  showCloseBtn = true,
}: PropsWithChildren<{
  isOpen: boolean;
  title?: string;
  close: () => void;
  width?: string;
  padding?: string;
  showCloseBtn?: boolean;
}>) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} as="div" className="relative z-30 bg-pink-500" onClose={close}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto bg-black bg-opacity-70">
          <div className="flex min-h-full items-center justify-center p-4 text-center font-plex">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`bg-black text-primary w-full ${width || 'max-w-xs'
                  } md:min-h-[357px] mt-20 mr-2 max-h-[90vh] transform overflow-auto ${padding || ''
                  } text-left transition-all 
                border-2 border-solid border-white
                `}
              >
                {title ? (
                  <DialogTitle
                    as="h3"
                    className="text text-primary font-bold text-lg leading-6 mt-6 ml-8"
                  >
                    {title}
                  </DialogTitle>
                ) : null}
                {children}
                {showCloseBtn && (
                  <div className="absolute right-4 top-7">
                    <IconButton
                      imgSrc={XCircle}
                      onClick={close}
                      title="Close"
                      classes="hover:rotate-90 bg-white invert"
                    />
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}


