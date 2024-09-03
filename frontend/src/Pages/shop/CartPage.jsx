import React, { useContext ,useState, useEffect } from "react";
import {FaTrash} from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthProvider";
const CartPage = () => {
  const { user, cart } = useContext(AuthContext);
  const [cartItems, setcartItems] = useState([]);


  // handledelete
  const handleDelete = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  // handleIncrease 
  const handleIncrease = (item) => {
   fetch(`http://localhost:6001/carts/${item._id}` , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8" 
    },
    body: JSON.stringify({quantity: item.quantity + 1})
   })
    .then((res) => res.json())
    .then((data) => {
      const updatedCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          return {...cartItem, quantity: cartItem.quantity + 1}
        }
        return cartItem
      });
      refetch();
      setcartItems(updatedCart)
    })
  }

   // handleIncrease 
   const handleDecrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}` , {
     method: "PUT",
     headers: {
       "Content-Type": "application/json; charset=UTF-8" 
     },
     body: JSON.stringify({quantity: item.quantity - 1})
    })
     .then((res) => res.json())
     .then((data) => {
       const updatedCart = cartItems.map((cartItem) => {
         if (cartItem.id === item.id) {
           return {...cartItem, quantity: cartItem.quantity - 1}
         }
         return cartItem
       });
       refetch();
       setcartItems(updatedCart)
     })
   }
 

  // calculate Price
  const calculatePrice = (item) => {
    return item.price * item.quantity
  }

  // calculate total price
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculatePrice(item)
  }, 0)

  const orderTotal = cartSubtotal
  return (
    <div className="section-container">
      <div className="max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col items-center justify-center gap-8">
          {/* texts */}
          <div className=" px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added To The <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table for one cart */}

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="font-medium">{item.name}</td>
                  <td>
                    <button className="btn btn-xs" onClick={() => handleDecrease(item)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      className="w-10 text-center overflow-hidden appearance-none"
                    />
                    <button className="btn btn-xs" onClick={() => handleIncrease(item)}>+</button>
                  </td>
                  <td>${calculatePrice(item).toFixed()}</td>
                  <th>
                    <button
                      className="btn btn-ghost text-red btn-xs"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details */}

      <div className="my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3 ">
          <h3 classNme="font-medium">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>ID: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3>Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price: ${orderTotal.toFixed()}</p>
          <button className="btn bg-green text-white">Procceed Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
