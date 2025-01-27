import { useNavigate } from 'react-router-dom';

const OrderTableList = props => {
  const order = props.order;

  const navigate = useNavigate();

  function formatCash(str) {
    return str
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + '.') + prev;
      });
  }

  return (
    <tr>
      <td>{order._id}</td>
      <td>{order.creator}</td>
      <td>{order.fullname}</td>
      <td>{order.phone}</td>
      <td>{order.address}</td>
      <td>
        {formatCash(order.total.toString())}
        VND
      </td>
      <td>{order.delivery ? 'Delivered' : 'Waiting for processing'}</td>
      <td>{order.status ? 'Payed' : 'Waiting for pay'}</td>
      <td>
        <button
          onClick={() =>
            navigate(`/order-detail/${order._id}`, {
              state: {
                order: order,
              },
            })
          }
          style={{
            height: '30px',
            border: 'none',
            color: '#495057',
            cursor: 'pointer',
          }}
        >
          View <span>&rarr;</span>
        </button>
      </td>
    </tr>
  );
};

export default OrderTableList;
