import { forEach, map, size } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder, usePayment, useTable } from "../../hooks";
import { OrderHistoryItem } from '../../components/Client/';
import { ModalConfirm } from "../../components/Common";
import { Button } from 'semantic-ui-react';
import { number } from 'yup';
import { getPaymentByTableApi } from '../../api/payment';

export function OrdersHistory() {
    const [idTable, setIdTable] = useState(null);
    const [isRequestAccount, setIsRequestAccount] = useState(false);
    const [showTypePayment, setShowTypePayment] = useState(false);
    const { getOrdersByTable, loading, orders, addPaymentToOrder } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();
    const { createPayment, getPaymentByTable } = usePayment();

    useEffect(() => {
        (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTableTemp = table[0].id;
            setIdTable(idTableTemp);
            getOrdersByTable(idTable, "", "ordering=-status,-created_at");
        })();
    }, []);

    useEffect(() => {
      (async ()=>{
        if(idTable){
            const response = await getPaymentByTable(idTable);
            setIsRequestAccount(response);
        }
      })()
    }, [idTable])
    

    const onCreatePayment = async (paymentType) =>{
        setShowTypePayment(false);
        
        let totalPayment = 0;
        forEach(orders, (order) =>{
            totalPayment += Number(order.product_data.price);
        });

        const paymentData = {
            table: idTable,
            totalPayment: totalPayment.toFixed(2),
            paymentType,
            statusPayment: "PENDING",
        };

        const payment = await createPayment(paymentData);

        for await (const order of orders){
            await addPaymentToOrder(order.id, payment.id);
        }
        window.location.reload();
    }

    return (
        <div>
            <h1>Historial de pedidos</h1>
            {
                loading ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        {size(orders) > 0 && (
                            <Button primary fluid onClick={() => size(isRequestAccount) === 0 && setShowTypePayment(true)}>
                                {size(isRequestAccount) > 0 
                                    ? "La cuenta está pedida"
                                    : "Pedir la cuenta"
                                }
                            </Button>
                        )}
                        {map(orders, (order) => (
                            <OrderHistoryItem key={order.id} order={order} />
                        ))}
                    </>
                )}
            <ModalConfirm
                title="Pagar con tarjeta o efectivo"
                show={showTypePayment}
                onCloseText="Efectivo"
                onClose={() => onCreatePayment('CASH')}
                onConfirmText="Tarjeta"
                onConfirm={() => onCreatePayment('CARD')}
            />
        </div>
    )
}