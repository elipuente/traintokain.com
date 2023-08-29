import { useState } from 'react';
import { Drawer } from 'vaul';

const DrawerOverlay = ({ children, afterDismissed, defaultOpen }) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <Drawer.Root
      defaultOpen={defaultOpen}
      dismissible
      closeThreshold={0.4}
      className='md:hidden pwa:hidden'
      onOpenChange={() => setDismissed(true)}
    >
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content
          className='bg-zinc-100 flex flex-col rounded-t-xl mt-24 fixed bottom-0 left-0 right-0'
          onAnimationEnd={() => (dismissed ? afterDismissed() : null)}
        >
          <div className='p-4 bg-white rounded-t-xl flex-1 pb-8'>
            <div className='mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8' />
            <div className='max-w-md mx-auto'>{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerOverlay;
