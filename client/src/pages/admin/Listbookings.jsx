import React, { useEffect, useState } from 'react';
import Loading from "../../components/Loading.jsx";
import Title from '../../components/Title.jsx';
import formatDateTime from '../../lib/DateCalculate.js';
import BlurCircle from '../../components/BlurCircle.jsx';
import { useAppContext } from '../../context/Appcontext.jsx';
import toast from 'react-hot-toast';


const Listbookings = () => {
  const { axios, getToken, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  return (
    <div>Listbookings</div>
  )
}

export default Listbookings