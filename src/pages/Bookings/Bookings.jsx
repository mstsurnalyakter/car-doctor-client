
import PropTypes from 'prop-types'
import useContextData from '../../hooks/useContextData'
import { useEffect, useState } from 'react';
import BookingsRow from './BookingsRow';

const Bookings = () => {
    const {user} = useContextData();
    const [bookings,setBookings] = useState([])
    const url = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setBookings(data)
        })
        .catch(error=>{
            console.error(error.message)
        })
    },[url])

        const handleDelete = (id) => {
          const proceed = confirm("Are You sure you want to delete!");
          if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.deletedCount > 0) {
                  alert("Delete successful");
                  const remaining = bookings.filter(booking => booking?._id !== id);
                  setBookings(remaining)
                }
              })
              .catch((error) => {
                console.error(error.message);
              });
          }
        };


  return (
    <div>
      <h2 className="text-center text-5xl">My Bookings: {bookings?.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Service</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking) => (
              <BookingsRow
                handleDelete={handleDelete}
                key={booking?._id}
                booking={booking}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Bookings.propTypes = {}

export default Bookings