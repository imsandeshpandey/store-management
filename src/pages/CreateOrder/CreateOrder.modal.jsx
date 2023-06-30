import { Modal, Sheet } from '@mui/joy';
import OrderForm from './Order.form';
import { useResponsive } from 'hooks/useResponsive';

const OrderModal = ({ open, setOpen, initialData, isEdit = false }) => {
  const { isMobile } = useResponsive();
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
        variant={isMobile ? 'plain' : 'outlined'}
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
        <OrderForm onCancel={() => setOpen(false)} initialData={initialData} isEdit={isEdit} />
      </Sheet>
    </Modal>
  );
};

export default OrderModal;
