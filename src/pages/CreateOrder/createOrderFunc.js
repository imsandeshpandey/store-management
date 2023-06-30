import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from 'firebase-local';
import NepaliDate from 'nepali-date';
const createOrder = async (order, isEdit) => {
  const { name, phoneNumber, date, address, orderNumber, netAmount, paidAmount, creditAmount } = order;

  const storeRef = doc(db, 'stores', 'ShivaAndSapanaTraders');
  const pushMethod = updateDoc;
  try {
    const docSnap = await getDoc(storeRef);
    if (docSnap.exists()) await setDoc(storeRef, {});
    const data = docSnap?.data();
    if (isEdit) {
      const prevOrder = data?.orders?.[orderNumber];
      const prevCustomer = data?.customers?.[prevOrder?.phoneNumber];
      updateDoc(storeRef, {
        orders: {
          [orderNumber]: {
            ...order,
            date: date,
            dateAD: new NepaliDate().getEnglishDate(),
          },
        },
        customers: {
          [prevOrder?.phoneNumber]: {
            ...prevCustomer,
            orders: prevCustomer?.orders,
            totalOrders: prevCustomer?.totalOrders,
            totalAmount: prevCustomer?.totalAmount - prevOrder?.netAmount + netAmount,
            totalPaid: prevCustomer?.totalPaid - prevOrder?.paidAmount + paidAmount,
            totalCredit: prevCustomer?.totalCredit - prevOrder?.creditAmount + creditAmount,
            lastOrderDate: date,
            lastOrderDateAD: new NepaliDate(date).getEnglishDate(),
          },
        },
      });
      return;
    }
    if (!data?.customers?.[phoneNumber]) {
      updateDoc(storeRef, {
        customers: {
          ...data.customers,
          [phoneNumber]: {
            name,
            phoneNumber,
            address,
            orders: [orderNumber],
            totalOrders: 1,
            totalAmount: netAmount,
            totalPaid: paidAmount,
            totalCredit: creditAmount,
            lastOrderDate: date,
            lastOrderDateAD: new NepaliDate(date).getEnglishDate(),
          },
        },
      });
    } else {
      updateDoc(storeRef, {
        customers: {
          [phoneNumber]: {
            ...data.customers[phoneNumber],
            orders: [...data.customers[phoneNumber]?.orders, orderNumber],
            totalOrders: data.customers[phoneNumber]?.totalOrders + 1,
            totalAmount: data.customers[phoneNumber]?.totalAmount + netAmount,
            totalPaid: data.customers[phoneNumber]?.totalPaid + paidAmount,
            totalCredit: data.customers[phoneNumber].totalCredit + creditAmount,
            lastOrderDate: date,
            lastOrderDateAD: new NepaliDate(date).getEnglishDate(),
          },
        },
      });
    }
    pushMethod(storeRef, {
      orders: {
        ...data?.orders,
        [orderNumber]: {
          ...order,
          date: date,
          dateAD: new NepaliDate().getEnglishDate(),
        },
      },
    });
  } catch (error) {
    return error;
  }
};

export default createOrder;
