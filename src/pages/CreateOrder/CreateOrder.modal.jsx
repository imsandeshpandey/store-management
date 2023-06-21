import { Modal, Sheet } from '@mui/joy';
import OrderForm from './Order.form';
import { useIsView } from 'hooks/useIsView.hook';

const OrderModal = ({ open, setOpen }) => {
  const { isMobile } = useIsView();
  return (
    <Modal
      layout="fullscreen"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Sheet
        variant="outlined"
        sx={(theme) => ({
          background: theme.gradient.neutral,
          boxSizing: 'border-box',
          overflow: 'auto',
          ...(!isMobile
            ? {
                maxWidth: '70%',
                maxHeight: '90%',
                borderRadius: 'md',

                boxShadow: 'lg',
              }
            : {
                width: '100%',

                height: '100%',
              }),
        })}>
        <OrderForm onCancel={() => setOpen(false)} />
      </Sheet>
    </Modal>
  );
};

export default OrderModal;
